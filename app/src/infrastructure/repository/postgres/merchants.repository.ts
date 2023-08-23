import logger from "../../../utils/logger";
import { getDataSource } from "./provider/connection.provider";
import { MerchantsSchema } from "./schema/merchants.schema";

export class MerchantsRepository {
  constructor() {
  }

  public async getMerchantById(merchantId: number): Promise<MerchantsSchema>{
    try {
    const DatabaseProviders = await getDataSource();
    return await DatabaseProviders.getRepository(MerchantsSchema).findOneBy({ merchantId})
  }
  catch (err) {
      logger.error(err)
      throw err;
  }
  }
  public async save(entity: MerchantsSchema): Promise<void>{
    try {
    const DatabaseProviders = await getDataSource();
    await DatabaseProviders.getRepository(MerchantsSchema).save(entity);
  }
  catch (err) {
      logger.error(err)
      throw err;
  }
  }
}