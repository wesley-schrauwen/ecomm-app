import { ParsePositiveIntPipe } from '../../src/pipes/parse-positive-int.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('ParsePositiveInt Pipe', () => {
  const metadataFixture: ArgumentMetadata = {
    type: 'param',
  };

  it('parses positive integers', () => {
    expect(new ParsePositiveIntPipe().transform(5, metadataFixture)).toEqual(5);
  });

  describe('when positive integer is typed as a string', () => {
    it('successfully parses the value', () => {
      expect(
        new ParsePositiveIntPipe().transform('5', metadataFixture),
      ).toEqual(5);
    });
  });

  it('fails with correct error message', () => {
    expect(() =>
      new ParsePositiveIntPipe().transform('five', metadataFixture),
    ).toThrowError(
      /Unexpected value five\. Expected whole number greater than zero/,
    );
  });

  it('fails on positive floats', () => {
    expect(() =>
      new ParsePositiveIntPipe().transform(5.1, metadataFixture),
    ).toThrowError(BadRequestException);
  });

  it('fails on strings', () => {
    expect(() =>
      new ParsePositiveIntPipe().transform('five', metadataFixture),
    ).toThrowError(BadRequestException);
  });

  it('fails on negative integers', () => {
    expect(() =>
      new ParsePositiveIntPipe().transform(-5, metadataFixture),
    ).toThrowError(BadRequestException);
  });

  it('fails on 0', () => {
    expect(() =>
      new ParsePositiveIntPipe().transform(0, metadataFixture),
    ).toThrowError(BadRequestException);
  });
});
