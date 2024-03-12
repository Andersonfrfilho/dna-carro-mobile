import { ORDER } from "./common,constant";

export interface Next extends Link {}

export interface Previous extends Link {}

export interface Last extends Link {}

export interface First extends Link {}

export interface Links {
  next: Next;
  previous: Previous;
  last: Last;
  first: First;
}

export interface ItemListDto {
  id: string;
  label: string;
  value: string;
}

export interface Link {
  href: string;
}

export interface Pagination<T> {
  limit: string;
  offset: string;
  results: T[];
  size: string;
  _links: Links;
}

class Order<T> {
  field: string;
  order: ORDER;
}

export class PaginationParamsDto<T> {
  page?: string;
  size?: string;
  order?: Order<T>;
  filter?: any | T;
}
