import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../_services/DataBaseServe';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isSubscribe: boolean = false;
  EmailAddress: string = '';

  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit() {
    this.isSubscribe = this.dataBaseService.subscribeEmail ? true : false;
  }


  handlerSubmit(): void {
    console.log('-------handlerSubmit----------');
    if (!this.EmailAddress) {
      alert('请输入邮件地址');
      return;
    }
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const result = reg.test(this.EmailAddress);
    if (!result) {
      alert('邮件地址输入不正确');
      return;
    }

    this.dataBaseService.subscribeEmail = this.EmailAddress;
    this.isSubscribe = this.dataBaseService.subscribeEmail ? true : false;

  }
}
