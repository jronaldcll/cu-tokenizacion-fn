import { GenericService } from "./services/generic.service"
import logger from "./utils/logger"

export const handler = async (event) => {
  logger.info(`INPUT ${JSON.stringify(event)}`);
  const genericService = new GenericService()
  let response = await genericService.process(event)
  logger.info(`Result: ${JSON.stringify(response)}`)
  return response;
}