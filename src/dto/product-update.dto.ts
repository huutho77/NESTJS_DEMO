export class UpdateProductDTO {
  name?: string;
  quantity?: number;
  price?: number;
  description?: string;
  percent_discount?: number;
  amount_view?: number;
  create_At?: Date;
  categoryId?: string;
}