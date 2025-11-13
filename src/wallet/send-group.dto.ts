import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
  IsArray,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1234',
    description: 'The unique identifier of the User',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'I3345FUQQ2GRBHFZQPLYQQX5HJMMRZMABCHRLWV6RCJYC6OO4MOLEUBEGU',
    description: 'The public address of the User',
  })
  public_address: string;

  @IsEnum(['user', 'manager'])
  @IsNotEmpty()
  @ApiProperty({
    enum: ['user', 'manager'],
    example: 'user',
    description: 'The type of User',
  })
  type: 'user' | 'manager';
}

export class CreateAssetDto {
  @ValidateNested()
  @Type(() => User)
  @ApiProperty({
    type: User,
    description: 'The sender User',
  })
  sender: User;

  @IsNumber()
  @ApiProperty({
    example: 31415,
    description: 'The total supply of the Asset',
  })
  total: number;

  @Transform((val) => BigInt(val.value))
  @ApiProperty({
    example: 2,
    description: 'The number of decimal places for the Asset',
  })
  decimals: bigint;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Indicates if the Asset is frozen by default',
  })
  defaultFrozen: boolean;

  @IsString()
  @ApiProperty({
    example: 'Test',
    description: 'The Unit name of the Asset (ie TEST)',
  })
  unitName: string;

  @IsString()
  @ApiProperty({
    example: 'Test Asset',
    description: 'The common name of the Asset',
  })
  assetName: string;

  @IsString()
  @ApiProperty({
    example: 'https://example.com',
    description: 'The URL for the Asset',
  })
  url: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'I3345FUQQ2GRBHFZQPLYQQX5HJMMRZMABCHRLWV6RCJYC6OO4MOLEUBEGU',
    description: 'The public address of the manager',
  })
  managerAddress?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'I3345FUQQ2GRBHFZQPLYQQX5HJMMRZMABCHRLWV6RCJYC6OO4MOLEUBEGU',
    description: 'The public address of the reserve',
  })
  reserveAddress?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'I3345FUQQ2GRBHFZQPLYQQX5HJMMRZMABCHRLWV6RCJYC6OO4MOLEUBEGU',
    description: 'The public address of the freeze',
  })
  freezeAddress?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'I3345FUQQ2GRBHFZQPLYQQX5HJMMRZMABCHRLWV6RCJYC6OO4MOLEUBEGU',
    description: 'The public address of the clawback',
  })
  clawbackAddress?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '9kykoZ1IpuOAqhzDgRVaVY2ME0ZlCNrUpnzxpXlEF/s=',
    description:
      'Optional 32-byte base64-encoded lease to prevent replay and conflicting transactions. Use a fixed value to ensure exclusivity. Generate with: Buffer.from(crypto.randomBytes(32)).toString("base64")',
  })
  lease?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  @ApiProperty({
    example: 'Note to all: notes are public',
    description: 'Optional public note to attach to transaction',
  })
  note?: string;
}

export class AssetTransferRequestDto {
  @Transform((val) => BigInt(val.value))
  @ApiProperty({
    example: 1234567890,
    description: 'The id of the Asset to transfer',
  })
  assetId: bigint;

  @ValidateNested()
  @Type(() => User)
  @ApiProperty({
    type: User,
    description: 'The sender User',
  })
  sender: User;

  @ValidateNested()
  @Type(() => User)
  @ApiProperty({
    type: User,
    example: '1234',
    description: 'The User to transfer the Asset to',
  })
  receiver: User;

  @IsNumber()
  @ApiProperty({
    example: 10,
    description: 'The amount of the Asset to transfer',
  })
  amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '9kykoZ1IpuOAqhzDgRVaVY2ME0ZlCNrUpnzxpXlEF/s=',
    description:
      'Optional 32-byte base64-encoded lease to prevent replay and conflicting transactions. Use a fixed value to ensure exclusivity. Generate with: Buffer.from(crypto.randomBytes(32)).toString("base64")',
  })
  lease?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  @ApiProperty({
    example: 'Note to all: notes are public',
    description: 'Optional public note to attach to transaction',
  })
  note?: string;
}

export class AlgoTransferRequestDto {
  @ValidateNested()
  @Type(() => User)
  @ApiProperty({
    type: User,
    example: '1234',
    description: 'The User to transfer Algos to',
  })
  receiver: User;

  @IsNumber()
  @ApiProperty({
    example: 10,
    description: 'The amount of algos to transfer',
  })
  amount: number;

  @ValidateNested()
  @Type(() => User)
  @ApiProperty({
    type: User,
    example: '1234',
    description: 'The User that is transferring Algos',
  })
  sender: User;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '9kykoZ1IpuOAqhzDgRVaVY2ME0ZlCNrUpnzxpXlEF/s=',
    description:
      'Optional 32-byte base64-encoded lease to prevent replay and conflicting transactions. Use a fixed value to ensure exclusivity. Generate with: Buffer.from(crypto.randomBytes(32)).toString("base64")',
  })
  lease?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  @ApiProperty({
    example: 'Note to all: notes are public',
    description: 'Optional public note to attach to transaction',
  })
  note?: string;
}

export class Transaction {
  @ValidateNested()
  @Transform(({ obj, value }) => {
    // Transform based on the type field to ensure proper validation
    if (obj.type === 'create_asset') {
      return plainToInstance(CreateAssetDto, value);
    } else if (obj.type === 'asset_transfer') {
      return plainToInstance(AssetTransferRequestDto, value);
    } else if (obj.type === 'algo_transfer') {
      return plainToInstance(AlgoTransferRequestDto, value);
    }
    return value;
  })
  @Type(() => Object)
  @ApiProperty({
    description: 'The transaction data. The structure depends on the transaction type.',
    example: {
      sender: { id: '1234', public_address: 'I3345FUQQ2GRBHFZQPLYQQX5HJMMRZMABCHRLWV6RCJYC6OO4MOLEUBEGU', type: 'user' },
      total: 31415,
      decimals: 2,
      defaultFrozen: false,
      unitName: 'TEST',
      assetName: 'Test Asset',
      url: 'https://example.com',
    },
  })
  txn: CreateAssetDto | AssetTransferRequestDto | AlgoTransferRequestDto;

  @IsEnum(['create_asset', 'asset_transfer', 'algo_transfer'])
  @ApiProperty({
    enum: ['create_asset', 'asset_transfer', 'algo_transfer'],
    example: 'create_asset',
    description: 'The type of transaction',
  })
  type: 'create_asset' | 'asset_transfer' | 'algo_transfer';

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1000,
    description: 'The fee of the transaction in microalgos. Default is 1000 microalgos.',
  })
  fee: number = 1000;
}

export class SendGroupDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Transaction)
  @ApiProperty({
    type: [Transaction],
    description: 'Array of transactions to execute as a group',
  })
  transactions: Transaction[];
}
