import { mockCulquiCardCvvAmex, mockCulquiCardEmail, mockCulquiCardExpirationMonth, mockCulquiCardExpirationYear, mockCulquiCardInValidData, mockCulquiCardNotRequirement, mockCulquiCardNumber, mockCulquiCardRequest, mockCulquiCardRequestHeader, mockCulquiCardRequestToken, mockCulquiCardVisaMastercard } from "../constants/culqui-card.constans"
import { GenericService } from "../../src/services/generic.service"
import { CARD_EXCEPTION_CODE } from "../../src/utils/util.parameter"

describe('[Culqui - Test] | Validación de datos Request', () => {
    describe('[GenericService => process] | Unit Test', () => {
        it('Debe devolver ok, porque se está ingresando un token válido', async () => {
          const genericService = new GenericService()
          const result = await genericService.process(JSON.parse(JSON.stringify(mockCulquiCardRequestHeader)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.SUCCESS)
        })
        it('Debe devolver error, porque la tarjeta no cumple con los requisitos', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardNotRequirement)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.CARD_NUMBER_ERROR)
        })
        it('Debe devolver error, contiene datos inválidos', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardInValidData)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.INVALID_DATA)
        })
        it('Debe devolver error, no cumple con los requisitos del algorimo Luhn', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardNumber)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.CARD_NUMBER_ERROR)
        })
        it('Debe devolver error, el valor del "CVV" no es aplicable para AMEX', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardCvvAmex)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.CVV_AMEX_ERROR)
        })
        it('Debe devolver error, el valor del "CVV" no es aplicable para Visa / Mastercard', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardVisaMastercard)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.CVV_VISA_MASTERCARD_ERROR)
        })
        it('Debe devolver error, el mes ingresado no es válido', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardExpirationMonth)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.EXPIRATION_MONTH_ERROR)
        })
        it('Debe devolver error, el año ingresado no es válido', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardExpirationYear)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.EXPIRATION_YEAR_ERROR)
        })
        it('Debe devolver error, el dominio del correo no es válido', async () => {
          const genericService = new GenericService()
          const result = await genericService.tokenCreation(JSON.parse(JSON.stringify(mockCulquiCardEmail)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.EMAIL_ERROR)
        })
        it('Debe devolver error, porque el token ya expiró', async () => {
          const genericService = new GenericService()
          const result = await genericService.getCardDetails(JSON.parse(JSON.stringify(mockCulquiCardRequestToken)))
            expect(result['code']).toEqual(CARD_EXCEPTION_CODE.TOKEN_EXPIRED_ERROR)
        })
    })

})