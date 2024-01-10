import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateEmailTemplateDto {
    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    message: string;

    @IsOptional()
    attachments?: string[]; // Array of file paths for attachments
}