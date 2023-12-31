import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailTemplateDto } from './create-email.dto';

export class UpdateEmailDto extends PartialType(CreateEmailTemplateDto) {}
