declare type ApiErrorResponse<ErrorResponse> = {
  [key in keyof ErrorResponse]?: string[];
};

declare interface IResponse<Response, ErrorResponse = any> {
  success: boolean;
  message: string;
  data: Response;
  errors?: ApiErrorResponse<ErrorResponse>;
}

interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

declare interface PaginationResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
