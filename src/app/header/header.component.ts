import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/CartService';
import { Observable } from 'rxjs';
import Goods from '../_models/Goods';
import Cart from '../_models/Cart';
import { DataBaseService } from '../_services/DataBaseServe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public total: number = 0;
  public cartList: Observable<Cart[]>;
  public keyword: string = '';

  constructor(private cartService: CartService, private baseDataService: DataBaseService) {
    //
  }

  ngOnInit() {
    this.total = this.cartService.getTotal();
    this.cartService.CartTotal.subscribe((val: number) => {
      console.log('val:', val);
      this.total = val;
    });
  }


  public handlerSearch(): void {
    console.log('keyword:', this.keyword);
    this.baseDataService.search(this.keyword);
  }
}
