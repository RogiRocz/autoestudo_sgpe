import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { AuthResponse, UserType } from '@common/interfaces/IAuth.interface';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<AuthResponse<UserType>> {
    return next.handle().pipe(
      map((data: AuthResponse<UserType>) => {
        const response = context.switchToHttp().getResponse<Response>()
        
        if (data && data.token) {
          response.setHeader('Authorization', `Bearer ${data.token}`);
        }
        
        return data;
      }),
    );
  }
}