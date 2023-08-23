export class CulquiCardRequestHydrator {
  hydrate(data: any) {
    return {
        email: data.email,
        card_number: data.card_number,
        cvv: data.cvv,
        expiration_year: data.expiration_year,
        expiration_month: data.expiration_month
    }
  }
}