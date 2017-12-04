export interface OperationListener<T> {
  success(obj: T);

  error(message: string);
}
