import { AxiosError } from 'axios';

export const BadRequestError = (message: string, available?: boolean) => {
  return {
    code: 400,
    error: 'Bad Request',
    message: message,
    available: available,
  };
};

export const NotFoundError = (message: string) => {
  return {
    code: 404,
    error: 'Not Found',
    message: message,
  };
};

export const InternalServerError = (message: string) => {
  return {
    code: 500,
    error: 'Internal Server Error',
    message: message,
  };
};

export const ConflictError = (message: string) => {
  return {
    code: 409,
    error: 'Conflict',
    message: message,
  };
};

export const UnauthorizedError = (message: string) => {
  return {
    code: 401,
    error: 'Unauthorized',
    message: message,
  };
};

export const Success = (message: string) => {
  return {
    code: 200,
    message: 'Success',
    data: message,
  };
};

interface CustomAxiosResponse extends AxiosError {
  original?: {
    routine: string;
  };
}
export const generateError = (error: CustomAxiosResponse) => {
  if (error.original?.routine === 'errorMissingColumn') return BadRequestError('Invalid attributes');

  if (error.isAxiosError as any) {
    console.error(`Axios Error: ${error?.response?.data?.message}`);
    return BadRequestError(error?.response?.data?.message);
  }

  if (!error.code) {
    return InternalServerError(error.message);
  }

  return error;
};
