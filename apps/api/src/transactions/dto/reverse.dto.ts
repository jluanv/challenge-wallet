import type { ReverseInput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ReverseDto implements ReverseInput {
  @ApiProperty({ example: "transaction-uuid" })
  @IsString()
  transactionId: string;
}
