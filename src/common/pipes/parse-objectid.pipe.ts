import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { validate as isUuid } from 'uuid';

@Injectable()
export class ParseObjectIdOrUuidPipe implements PipeTransform {
  transform(value: string): string {
    const isValidObjectId = Types.ObjectId.isValid(value);
    const isValidUuid = isUuid(value);

    if (!isValidObjectId && !isValidUuid) {
      throw new BadRequestException(
        `${value} no es un ObjectId ni un UUID válido`,
      );
    }

    return value;
  }
}
