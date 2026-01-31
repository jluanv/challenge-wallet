import { HttpException, HttpStatus } from "@nestjs/common";

export function NotFoundError(entity: string): never {
  throw new HttpException(
    { message: `${entity} não encontrada`, details: [] },
    HttpStatus.NOT_FOUND,
  );
}

export function BadRequestError(message: string, details: any[] = []): never {
  throw new HttpException({ message, details }, HttpStatus.BAD_REQUEST);
}
