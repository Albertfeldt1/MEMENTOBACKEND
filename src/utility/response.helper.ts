export interface ResponseStructure<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const handleSuccess = <T>(
  data: T,
  message = 'Success',
): ResponseStructure<T> => ({
  success: true,
  message,
  data,
});

export const handleError = (
  message = 'Something went wrong',
): ResponseStructure<null> => ({
  success: false,
  message,
  data: null,
});
