export interface IRequest {
  id?: number;
  method: string;
  path: string;
  ip: string;
  payload: string;
  headers?: IRequestHeader[];
}

export interface IRequestHeader {
  id?: number;
  key: string;
  value: string;
  request_id: number;
}
