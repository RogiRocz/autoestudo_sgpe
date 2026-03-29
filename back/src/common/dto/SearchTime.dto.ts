import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";
import { OwnerDataDTO } from "./OwnerData.dto";


export class SearchTimeDTO extends OwnerDataDTO {
    @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Data de início do intervalo' })
    @IsOptional()
    @IsDateString()
    startDate: string;

    @ApiProperty({ example: '2023-12-31T23:59:59.999Z', description: 'Data de fim do intervalo' })
    @IsOptional()
    @IsDateString()
    endDate: string;
}