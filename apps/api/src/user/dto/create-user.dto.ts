import { CreateUserInput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto implements CreateUserInput {
  @ApiProperty({ example: "99999999999" })
  @IsString()
  cpf: string;

  @ApiProperty({ example: "email@email.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Fulano de tal" })
  @IsString()
  name: string;

  @ApiProperty({ example: "@Abc1234" })
  @IsString()
  @MinLength(8)
  password: string;
}
