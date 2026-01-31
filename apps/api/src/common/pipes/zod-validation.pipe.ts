import { BadRequestException, type PipeTransform } from "@nestjs/common";
import type { ZodType } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(fromZodError(result.error).message);
    }
    return result.data;
  }
}
