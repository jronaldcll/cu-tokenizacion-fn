export class CulquiCardRequestDTO {
  constructor(
    _email: string,
    _card_number: string,
    _cvv: string,
    _expiration_year: string,
    _expiration_month: string){
      this.email = _email;
      this.card_number = _card_number;
      this.cvv = _cvv;
      this.expiration_year = _expiration_year;
      this.expiration_month = _expiration_month;
  }
  private email:string;
    public get _email():string{
        return this.email;
    }
  private card_number:string;
    public get _card_number():string{
        return this.card_number;
    }
  private cvv:string;
    public get _cvv():string{
        return this.cvv;
    }
  public set _cvv(value) {
    this.cvv = value;
  }
  private expiration_year:string;
    public get _expiration_year():string{
        return this.expiration_year;
    }
  private expiration_month:string;
    public get _expiration_month():string{
        return this.expiration_month;
    }
}