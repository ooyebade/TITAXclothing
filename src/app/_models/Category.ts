import Goods from './Goods';


export default class Category {

  id: number; //               序号
  categoryName: string; //     分类名称
  children: Goods[]; //         商品列表
}
