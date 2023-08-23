export const mockAuthAuthorize = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFkZSI6IkNvbWVyY2lvX1Rlc3QifQ.igIRS-TFRwMcsgi3UYompSputffXa8kazRbrCBCatR0'

export const mockCulquiCardRequestHeader = {
    headers:
        {
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiMSIsIm1lcmNoYW50TmFtZSI6IkNvbWVyY2lvIDEifQ.e-Dt1QUTlohfBg4nfELwCmpHlJb1jcmMo5crUzjEWzw'
        },
    body:
    {  
        email: 'jronaldcll@gmail.com',
        card_number: '4111111111111111',
        cvv: '123',
        expiration_year: '2025',
        expiration_month: '09'
    }
}

export const mockCulquiCardRequest ={
    email: 'jronaldcll@gmail.com',
    card_number: '4111111111111111',
    cvv: '123',
    expiration_year: '2025',
    expiration_month: '09'
}
export const mockCulquiCardRequestToken ={
    token: 'Vpm1VIrFbDBTxgin'

}

export const mockCulquiCardNotRequirement = {
    ...mockCulquiCardRequest,
    card_number:'411111111111111'
}

export const mockCulquiCardInValidData = {
    ...mockCulquiCardRequest,
    cvv:'12'
}

export const mockCulquiCardNumber = {
    ...mockCulquiCardRequest,
    card_number:'2111111111111111'
}

export const mockCulquiCardCvvAmex = {
    ...mockCulquiCardRequest,
    cvv:'123',
    card_number: '375552190437456'
}

export const mockCulquiCardVisaMastercard = {
    ...mockCulquiCardRequest,
    cvv:'1234',
    card_number: '4111111111111111'
}

export const mockCulquiCardExpirationMonth = {
    ...mockCulquiCardRequest,
    expiration_month:'13'
}

export const mockCulquiCardExpirationYear = {
    ...mockCulquiCardRequest,
    expiration_year:'2029'
}

export const mockCulquiCardEmail = {
    ...mockCulquiCardRequest,
    email:'rcastillo@test.com'
}

