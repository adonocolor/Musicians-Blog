/* eslint-disable */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTimeInterceptor<T> implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const currentTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        return { ...data, time: Date.now() - currentTime };
      }),
    );
  }
}
