
import { Injectable, Component } from '@angular/core';
import Goods from '../_models/Goods';
import Cart from '../_models/Cart';
import { Observable, Subject } from 'rxjs';


/**
 * 购物车
 *
 * @export
 * @class CartService
 */
@Injectable({ providedIn: 'root' })
export class CartService {

  /**
   * 购物车列表
   *
   * @private
   * @type {Cart[]}
   * @memberof CartService
   */
  private cartList: Cart[] = [];

  public cartListData: Subject<Cart[]> = new Subject<Cart[]>();

  /**
   * 购物车数据
   *
   * @type {Subject<number>}
   * @memberof CartService
   */
  public CartTotal: Subject<number> = new Subject<number>();


  /**
   * 更新购物车信息
   *
   * @param {Goods} info
   * @param {number} [val=0]
   * @memberof CartService
   */
  modifyTotal(info: Goods, val: number = 0): void {
    const item = this.cartList.filter((f) => f.goodsInfo.name === info.name);
    if (item.length === 0) {
      if (val > 0) {
        this.cartList.push({ id: this.cartList.length, total: val, goodsInfo: info });
      }
    } else {
      item[0].total += val;
    }

    this.cartList = this.cartList.filter((f) => f.total > 0);
    // 通知数量更新了。
    this.CartTotal.next(this.getTotal());
    // 通知更新购物车
    this.cartListData.next(this.cartList);
  }

  /**
   * 购物车总数量
   *
   * @returns
   * @memberof CartService
   */
  getTotal() {
    const items = this.cartList.map((m) => m.total);
    if (items.length === 0) {
      return 0;
    }
    return items.reduce((a, b) => a + b);
  }

  /**
   * 获取购物车列表
   *
   * @returns
   * @memberof CartService
   */
  getCartList() {
    return this.cartList;
  }

  delete(index: number) {
    this.cartList.splice(index, 1);
    // 通知数量更新了。
    this.CartTotal.next(this.getTotal());
    // 通知更新购物车
    this.cartListData.next(this.cartList);
  }
}
