export interface IRequest {
  id?: number;
  method: string;
  path: string;
  ip: string;
  payload: string;
  headers?: IRequestHeader[];
  params?: IRequestParam[];
  created_at?: string;
}

export interface IRequestHeader {
  id?: number;
  key: string;
  value: string;
  request_id: number;
}

export interface IRequestParam {
  id?: number;
  key: string;
  value: string;
  request_id: number;
}
