export class CreateProductDTO {
  name: string;
  quantity: number;
  price: number;
  description: string;
  create_At?: Date;
  update_At?: Date;
  categoryId: string;
}