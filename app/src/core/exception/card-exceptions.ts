import { CulquiCardRequestDTO } from "../../services/dto/culqui-card-request.dto";
import { CulquiCardResponseDTO } from "../../services/dto/culqui-card-response.dto";
import logger from "../../utils/logger";
import { CARD_EXCEPTION_CODE, CARD_EXCEPTION_MESSAGE } from "../../utils/util.parameter";
const Joi = require('joi');
var luhn = require("luhn");

export class CardException{
    constructor(){
      }
  
    public async cardValidations(card_request: CulquiCardRequestDTO) {
        const schema = Joi.object({
          email: Joi.string().email().required(),
          card_number: Joi.string().min(13).max(16).required(),
          cvv: Joi.string().min(3).max(4).required(),
          expiration_year: Joi.string().length(4).required(),
          expiration_month: Joi.string().min(1).max(2).required()
        });
       let response: CulquiCardResponseDTO = new CulquiCardResponseDTO();
        response._code = CARD_EXCEPTION_CODE.SUCCESS;
        response._message = CARD_EXCEPTION_MESSAGE.SUCCESS;
        response._data = [];

        const { error } = schema.validate(card_request);
        if (error) {
          logger.error(`Validate JOI: ${JSON.stringify(error)}`);
            response._code = CARD_EXCEPTION_CODE.INVALID_DATA;
            response._message = CARD_EXCEPTION_MESSAGE.INVALID_DATA + ' => ' + error.details[0].message;
            return response;
        }
        const isValidCard = luhn.validate(card_request['card_number']);
        if (isValidCard === false) {
          logger.error(`Validate luhn: ${JSON.stringify(isValidCard)}`);
            response._code = CARD_EXCEPTION_CODE.CARD_NUMBER_ERROR;
            response._message = CARD_EXCEPTION_MESSAGE.CARD_NUMBER_ERROR;
            return response;
        }
        if (card_request['card_number'].charAt(0) === '3' && card_request['cvv'].length === 3) {
            response._code = CARD_EXCEPTION_CODE.CVV_AMEX_ERROR;
            response._message = CARD_EXCEPTION_MESSAGE.CVV_AMEX_ERROR;
            return response;
        }
        if (card_request['card_number'].charAt(0) !== '3' && card_request['cvv'].length === 4) {
            response._code = CARD_EXCEPTION_CODE.CVV_VISA_MASTERCARD_ERROR;
            response._message = CARD_EXCEPTION_MESSAGE.CVV_VISA_MASTERCARD_ERROR;
            return response;
        }
        if(Number(card_request['expiration_month']) < 1 || Number(card_request['expiration_month']) > 12){
            response._code = CARD_EXCEPTION_CODE.EXPIRATION_MONTH_ERROR;
            response._message = CARD_EXCEPTION_MESSAGE.EXPIRATION_MONTH_ERROR;
            return response;
        }
        var today = new Date(), yearNow = Number(today.getFullYear()), yearMax = yearNow + 5;
        if(Number(card_request['expiration_year']) < yearNow){
            response._code = CARD_EXCEPTION_CODE.EXPIRATION_YEAR_ERROR;
            response._message = CARD_EXCEPTION_MESSAGE.EXPIRATION_YEAR_ERROR;
            return response;
        }
        if(Number(card_request['expiration_year']) > yearMax){
            response._code = CARD_EXCEPTION_CODE.EXPIRATION_YEAR_ERROR;
            response._message = CARD_EXCEPTION_MESSAGE.EXPIRATION_YEAR_ERROR + `=> No puede exceder el siguiente año: ${yearMax}`;        
            return response;    
        }
        const emailParts = card_request['email'].split('@'), domain = emailParts[1];
        if(domain === 'gmail.com' || domain === 'hotmail.com' || domain === 'yahoo.es'){
          logger.info(`El dominio ingresado "${domain}", es valido`);
        }else{
            response._code = CARD_EXCEPTION_CODE.EMAIL_ERROR;
            response._message = CARD_EXCEPTION_MESSAGE.EMAIL_ERROR;
            return response;
        }
        logger.info(`[cardValidations] | Response => ${JSON.stringify(response)}`);
        return response;
      }
}

