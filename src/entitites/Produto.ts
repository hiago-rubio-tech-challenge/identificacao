export class Produto {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public createdAt: Date,
    public updatedAt: Date,
    public deleted?: boolean,
    public deletedAt?: Date,
    public readonly _id?: string
  ) {}
}
