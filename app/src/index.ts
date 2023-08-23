import { GenericService } from "./services/generic.service"
import logger from "./utils/logger"

export const handler = async (event) => {
  logger.info(`INPUT ${JSON.stringify(event)}`);
  const genericService = new GenericService()
  let response = await genericService.process(event)
  logger.info(`Result: ${JSON.stringify(response)}`)
  return response;
}

//! Input opcional para validar en local
// var input= {
//   headers:
//     {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiMSIsIm1lcmNoYW50TmFtZSI6IkNvbWVyY2lvIDEifQ.e-Dt1QUTlohfBg4nfELwCmpHlJb1jcmMo5crUzjEWzw"},
//     body:{  
//       // "token": "Vpm1VIrFbDBTxgin"
//       "email": "jronaldcll@gmail.com",
//       "card_number": "4111111111111111",
//       "cvv": "123",
//       "expiration_year": "2025",
//       "expiration_month": "09"
//     }};
// async function test (){
//    var ok;
//    ok= await handler(input );
// }

// test();