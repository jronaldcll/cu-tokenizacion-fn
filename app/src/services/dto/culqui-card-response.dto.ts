export class CulquiCardResponseDTO {
  private code: number;
  public get _code(): number {
    return this.code;
  }
  public set _code(value: number) {
    this.code = value;
  }
  private message: string;
  public get _message(): string {
    return this.message;
  }
  public set _message(value: string) {
    this.message = value;
  }

  private data: any;
  public get _data(): any {
    return this.data;
  }
  public set _data(value: any) {
    this.data = value;
  }
}
