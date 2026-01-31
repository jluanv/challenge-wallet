import { CreateAccountInput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAccountDto implements CreateAccountInput {
  @ApiProperty({ example: "Conta Corrente" })
  @IsString()
  name: string;
}
