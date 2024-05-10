import { IsString, IsUUID } from "class-validator";

export class CreateBrandDto {
    
    @IsString()
    readonly name: string

}
