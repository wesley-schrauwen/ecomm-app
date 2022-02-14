import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const parsedValue = +value;

    if (!Number.isInteger(+value) || parsedValue <= 0) {
      throw new BadRequestException(
        `Unexpected value ${value}. Expected whole number greater than zero.`,
      );
    }

    return parsedValue;
  }
}
