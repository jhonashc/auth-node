export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly name: string,
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(400, message, 'Bad Request');
  }

  static conflict(message: string) {
    return new CustomError(409, message, 'Conflict');
  }

  static unauthorized(message: string) {
    return new CustomError(401, message, 'Unauthorized');
  }

  static forbidden(message: string) {
    return new CustomError(403, message, 'Forbidden');
  }

  static notFound(message: string) {
    return new CustomError(404, message, 'Not Found');
  }

  static internalServer(message: string) {
    return new CustomError(500, message, 'Internal Server');
  }
}
