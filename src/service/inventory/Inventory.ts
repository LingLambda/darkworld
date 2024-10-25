export class Inventory {
  constructor(
    public userId: string, //关联character表的用户id
    public item: [
      {
        itemId: number; //物品id
        type: string;
      }
    ],
  ) {}
}
