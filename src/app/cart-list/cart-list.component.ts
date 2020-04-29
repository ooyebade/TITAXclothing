import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/CartService';
import Cart from '../_models/Cart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartList: Cart[] = [];

  constructor(private cartServer: CartService) {

    this.cartList = cartServer.getCartList();
    console.log('this.cartList :', this.cartList);
  }


  ngOnInit() {

    this.cartServer.cartListData.subscribe((item) => {
      this.cartList = item;
    });
  }

  handlerDelete(index: number, info: Cart): void {
    console.log('index:', index);

    this.cartServer.delete(index);
  }
}
