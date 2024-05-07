import { IsOptional, IsString } from "class-validator";

export class UpdateTypeNotification {
    @IsOptional()
    @IsString()
    typeName?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  }