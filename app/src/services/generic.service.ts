import { CulquiCardRequestHydrator } from "../core/hydrators/culqui-card-request.hydrator";
import { CulquiCardRequestDTO } from "./dto/culqui-card-request.dto";
import logger from "../utils/logger";
import { CardException } from "../core/exception/card-exceptions";
import { JwtAuthGuard } from "../infrastructure/guard/jwt-auth.guard";
import { MerchantsRepository } from "../infrastructure/repository/postgres/merchants.repository";
import { DatabaseException, ExpiredTokenException, UnauthorizedException } from "../core/exception/http-exceptions";
import { mockMerchant } from "../utils/mocks";
import { CARD_EXCEPTION_CODE } from "../utils/util.parameter";
import { RandomGenerator } from "../utils/random";
import RedisConnector from "../infrastructure/repository/elasticache/redis/redis-connector";
export class GenericService {

  private readonly culquiCardRequest: CulquiCardRequestHydrator
  private readonly cardException: CardException
  private readonly jwtAuthGuard: JwtAuthGuard
  private dbprovider = new MerchantsRepository();
  private readonly randomGenerator: RandomGenerator
  private readonly redisConnector: RedisConnector

  constructor() {
    this.culquiCardRequest = new CulquiCardRequestHydrator
    this.cardException = new CardException
    this.jwtAuthGuard = new JwtAuthGuard
    this.randomGenerator = new RandomGenerator
    this.redisConnector = new RedisConnector
  }


  async process(event: any) {
    try {
          const responseVerify = await this.jwtAuthGuard.verifyToken(event.headers);

          await this.dbprovider.save(mockMerchant); //* Mock insert
          const isExistMerchantId = await this.dbprovider.getMerchantById(responseVerify.merchantId);

          if(!isExistMerchantId)
          {
            return new UnauthorizedException(141,'No autorizado.');
          }

          if (!event.body.token) {
            return await this.tokenCreation(event.body)
          }else{
            return await this.getCardDetails(event.body.token)
          }
      

    } catch (error) {
      logger.error(`Ocurrio un error en process - GenericProcess: ${error}`)
    }

  }

  async tokenCreation(request: CulquiCardRequestDTO){
   
    var rspValidation = await this.cardException.cardValidations(request)

      if(rspValidation._code !== CARD_EXCEPTION_CODE.SUCCESS){
        return rspValidation;
      }

    let tokenGenerate = await this.randomGenerator.generateRandomData()
    const card_result = this.culquiCardRequest.hydrate(request)

        try {
          await this.redisConnector.set(tokenGenerate,JSON.stringify(card_result))
        } catch (error) {
          logger.error(error)
          return new DatabaseException(111, 'Error procesando la solicitud')
        }    

      rspValidation._data = tokenGenerate;
      return rspValidation;
  }

  async getCardDetails(tokenCard: string){
    var result_card = await this.redisConnector.get(tokenCard)
      if(!result_card){
        return new ExpiredTokenException(119,'Token expirado, ha superado los 15 min de retención')
      }
        const cardRecord = JSON.parse(result_card); 
        delete cardRecord.cvv;
        return cardRecord
  }
}