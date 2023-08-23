import { CARD_EXCEPTION_CODE, CARD_EXCEPTION_MESSAGE } from '../../utils/util.parameter'

export class BaseException {
  constructor (
    public code: number = CARD_EXCEPTION_CODE.INTERNAL_SERVER_ERROR,
    public message: string = CARD_EXCEPTION_MESSAGE.INTERNAL_SERVER_ERROR,
    private readonly data: any = []
  ) {
    this.code = code
    this.message = message
  }
}

export class UnauthorizedException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class BadRequestException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class ConflictException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class NotFoundException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class RequestTimeoutException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class ValidationException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class TokenException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class DatabaseException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}

export class InternalServerErrorException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}
export class ExpiredTokenException extends BaseException {
  constructor (
    code: number,
    message: string
  ) {
    super(code, message, [])
  }
}