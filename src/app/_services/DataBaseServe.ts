
import { Injectable, Component } from '@angular/core';
import Goods from '../_models/Goods';
import Category from '../_models/Category';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DataBaseService {

  /**
   * 通知搜索关键字更新
   *
   * @type {Subject<string>}
   * @memberof DataBaseService
   */
  public SearchKeyword: Subject<string> = new Subject<string>();
  /**
   * 通知数据更新
   *
   * @type {Subject<Category[]>}
   * @memberof DataBaseService
   */
  public categoryListData: Subject<Category[]> = new Subject<Category[]>();

  /**
   * 商品分类数据
   *
   * @type {Category[]}
   * @memberof DataBaseService
   */
  categoryItem: Category[] = [
    {
      id: 1,
      categoryName: 'Coats & Jackets',
      children: [
        {
          id: 1, price: 50, stock: 999, name: 'Mens plus thick velvet long-sleeved denim jacket',
          imgUrl: '/assets/img/StrippedJacket.jpg',
        },
        {
          id: 1, stock: 45, price: 999, name: 'Striped jacket female lapel collar waist mesh stitching fake two-piece top new spring',
          imgUrl: '/assets/img/jacket.jpeg',
        },
        {
          id: 1, stock: 100, price: 999, name: 'womens slim fit trench coat khaki overcoat',
          imgUrl: '/assets/img/coat2.jpg',
        },
        {
          id: 1, price: 66, stock: 999, name: 'green faux fur reversible bomber jacket',
          imgUrl: '/assets/img/coat.jpg',
        }
      ]
    },
    {
      id: 2,
      categoryName: 'Pants & Jeans',
      children: [
        {
          id: 3, stock: 999, price: 72, name: 'mens loose spring and summer models tide brand casual spring Korean trend',
          imgUrl: '/assets/img/jeans3.jpeg',
        },
        {
          id: 3, stock: 999, price: 23, name: 'nine points wide legs casual wild straight denim loose Hong Kong style long pants men blue',
          imgUrl: '/assets/img/jeans2.jpg',
        },
        {
          id: 3, stock: 999, price: 34, name: 'straight loose pants men 2020 summer new mens business casual pants',
          imgUrl: '/assets/img/jeans.jpeg',
        },
        {
          id: 3, stock: 999, price: 45, name: 'PLAYYOUNG mens spring and autumn casual pants spring long pants',
          imgUrl: '/assets/img/jeans4.jpeg',
        },
        {
          id: 3, stock: 999, price: 74, name: 'mens four seasons cotton stretch pants guard pants overalls casual pants Korean slim',
          imgUrl: '/assets/img/pants.jpg',
        },
      ]
    },
    {
      id: 3, categoryName: 'Sweaters & Hoodeis',
      children: [
        {
          id: 3, stock: 999, price: 68, name: 'womens and mens red color autumn & winter hoodie',
          imgUrl: '/assets/img/hoodie.jpeg',
        },
        {
          id: 3, stock: 999, price: 60, name: 'Spring and summer brand new style grey hoodie with black strips',
          imgUrl: '/assets/img/sweatershirt.png',
        },
        {
          id: 3, stock: 999, price: 43, name: 'unisex white hoodie with fashion print',
          imgUrl: '/assets/img/hoodie2.png',
        },
        {
          id: 3, stock: 999, price: 22, name: 'Sweater male cartoon anime school star autumn and winter plus velvet student loose couple jacket',
          imgUrl: '/assets/img/hoodie3.jpg',
        },
        {
          id: 3, stock: 999, price: 36, name: 'hooded spring and autumn cartoon creative printing',
          imgUrl: '/assets/img/hoodie4.jpg',
        },
        {
          id: 3, stock: 999, price: 45, name: 'mens middle and small childrens knitted hoodie sweater autumn and winter clothing tide clothing new spring and autumn sports jacket',
          imgUrl: '/assets/img/WhiteHoodie.jpg',
        },
      ]

    }
  ];


  /**
   * 返回数据
   *
   * @returns {Category[]}
   * @memberof DataBaseService
   */
  categoryList(): Category[] {
    return this.categoryItem;
  }

  /**
   * 根据分类名称，获取对应的分类数据
   *
   * @param {string} name
   * @returns {Category[]}
   * @memberof DataBaseService
   */
  getCategoryByName(name: string): Category[] {
    const item = this.categoryItem.filter((f) => f.categoryName === name);
    return item || [];
  }
  /**
   *  根据分类ID，获取对应的分类数据
   *
   * @param {number} id
   * @returns {Category[]}
   * @memberof DataBaseService
   */
  getCategoryById(id: number): Category[] {
    const item = this.categoryItem.filter((f) => f.id === id);
    return item || [];
  }

  /**
   * 获取订阅邮件
   *
   * @memberof DataBaseService
   */
  get subscribeEmail() {
    const val = window.localStorage.getItem('subscribeEmail');
    if (val) {
      const email = (JSON.parse(val) || {}).subscribeEmail;
      return email;
    }
    return null;
  }

  /**
   * 保存订阅数据到 localStorage 里
   *
   * @memberof DataBaseService
   */
  set subscribeEmail(val: string) {
    window.localStorage.setItem('subscribeEmail', JSON.stringify({ subscribeEmail: val }));
  }

  /**
   * 输入商品名称进行搜索
   *
   * @param {string} keyword
   * @returns {void}
   * @memberof DataBaseService
   */
  search(keyword: string): void {
    if (!keyword) {
      this.categoryListData.next(this.categoryItem);
      return;
    }

    const items = {};
    this.categoryItem.forEach((row, index) => {
      const { children } = row;
      if (!items[row.id]) {
        items[row.id] = { children: [] };
      }
      children.forEach((obj) => {
        if (obj.name.indexOf(keyword) >= 0) {

          items[row.id].children.push(obj);
        }
      });
    });

    // 通知更新商品列表信息
    this.categoryListData.next(Object.values(items));
  }
}
