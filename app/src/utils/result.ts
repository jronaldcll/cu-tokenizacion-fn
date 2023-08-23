export class Result<T> {
    isSuccess: boolean
    isFailure: boolean
    error: string
    value: T
  
    constructor (isSuccess: boolean, error: string = '', value?: T) {
      this.isSuccess = isSuccess
      this.isFailure = !isSuccess
      this.error = error
      this.value = value
    }
  
    getValue (): T {
      return this.value
    }
  
    static ok<U> (value?: U): Result<U> {
      return new Result<U>(true, undefined, value)
    }
  
    static fail<U> (error: string): Result<U> {
      return new Result<U>(false, error)
    }
  }
  