import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../_services/DataBaseServe';
import Category from '../_models/Category';
import Goods from '../_models/Goods';
import { CartService } from '../_services/CartService';
import { Router, Params, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private baseData: DataBaseService, private cartService: CartService,
    private routeInfo: ActivatedRoute,
    private router: Router) {

  }

  private categoryId: string = '';
  public Items: Category[];
  public GoodsList: Goods[] = [];

  ngOnInit() {
    this.Items = this.baseData.categoryList();
    this.initData();

    this.categoryId = this.routeInfo.snapshot.queryParams.id;
    console.log('this.categoryId', this.categoryId);


    this.routeInfo.queryParamMap.subscribe((params: ParamMap) => {
      this.categoryId = params.get('id');
      console.log('this.categoryId', this.categoryId);
      if (this.categoryId) {
        this.Items = this.baseData.getCategoryById(Number(this.categoryId));
      } else {
        this.Items = this.baseData.categoryList();
      }
      console.log('this.items', this.Items);
      this.initData();
    });


    this.baseData.categoryListData.subscribe((data) => {
      this.Items = data;
      this.initData();
    });
  }

  initData() {
    this.GoodsList = [];
    this.Items.forEach(({ children }) => {
      children.forEach((row) => {
        this.GoodsList.push(row);
      });
    });
  }


  public handlerAddCart(item: Goods): void {
    console.log('------------------add cart--------------');
    this.cartService.modifyTotal(item, 1);
  }

  handlerClick() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  }

}
