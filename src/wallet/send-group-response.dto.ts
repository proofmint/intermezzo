import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendGroupResponseDto {
  @IsString()
  @ApiProperty({
    example: 'UQKSSZ265K7MCQ6GWZPPCM2LH4FYKUBGNWKYX6366GC3O727227Q',
    description: "The transaction id's of the group",
  })
  transaction_id: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['UQKSSZ265K7MCQ6GWZPPCM2LH4FYKUBGNWKYX6366GC3O727227Q', 'QOOBRVQMX4HW5QZ2EGLQDQCQTKRF3UP3JKDGKYPCXMI6AVV35KQA'],
    description: 'The encoded signed transactions of the group',
  })
  signed_transactions: string[];
}
