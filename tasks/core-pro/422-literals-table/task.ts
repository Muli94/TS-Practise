import type { Entities, User, Product, Order } from './table-models.ts';

type Models = {
  user: User;
  order: Order;
  product: Product;
}

type TName<Model> = {
  [Key in keyof Models]: Models[Key] extends Model ? Key : never
}[keyof Models];

type Get<Model> = {
  [Prop in `get${Capitalize<TName<Model>>}`]: (id: number) => Model;
};

type Update<Model> = {
  [Prop in `update${Capitalize<TName<Model>>}`]: (id: number, update: Partial<Model>) => Model;
};

type Delete<Model> = {
  [Prop in `delete${Capitalize<TName<Model>>}`]: (id: number) => Model;
};

export type Table<Model> = Get<Model> &
  Update<Model> &
  Delete<Model>;
