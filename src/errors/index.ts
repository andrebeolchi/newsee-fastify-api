export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class OperationFailedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OperationFailedError'
  }
}

export class MissingParametersError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MissingParametersError'
  }
}
