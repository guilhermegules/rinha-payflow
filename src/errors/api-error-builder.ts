import { ApiErrorResponse } from "../types/api-error-response";

export const createApiError = (): ApiErrorResponse => ({
  statusCode: 500,
  message: "Internal Server Error",
});

export const setStatusCode =
  (code: number) =>
  (error: ApiErrorResponse): ApiErrorResponse => ({
    ...error,
    statusCode: code,
  });

export const setMessage =
  (message: string) =>
  (error: ApiErrorResponse): ApiErrorResponse => ({
    ...error,
    message,
  });

export const setDetails =
  (details: any) =>
  (error: ApiErrorResponse): ApiErrorResponse => ({
    ...error,
    details,
  });
