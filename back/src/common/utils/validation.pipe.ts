import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class IsPositive implements PipeTransform{
    transform(value: any) {
        const val = parseInt(value, 10)
        if(isNaN(val) || val <= 0){
            throw new BadRequestException('Validação de campo: O campo precisa ser maior que zero')
        }
        return val;
    }
}