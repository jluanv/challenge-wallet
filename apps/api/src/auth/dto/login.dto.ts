import { LoginInput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginDto implements LoginInput {
  @ApiProperty({ example: "99999999999" })
  @IsString()
  cpf: string;

  @ApiProperty({ example: "12345678" })
  @IsString()
  @MinLength(8)
  password: string;
}
