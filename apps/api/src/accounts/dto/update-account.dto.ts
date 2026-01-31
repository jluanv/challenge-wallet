import type { UpdateAccountInput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateAccountDto implements UpdateAccountInput {
  @ApiProperty({ example: "Conta Poupança" })
  @IsString()
  @IsOptional()
  name?: string;
}
