import { Component } from '@angular/core';
import { Http, Response,RequestOptions,Headers} from '@angular/http';
import {PaymentService} from './services/payment.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  message: string;

  
  constructor(
    private _PaymentService:PaymentService

  ) { }



  chargeCreditCard() {
    let form = document.getElementsByTagName("form")[0];
    console.log("Form Data :: ", form);
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      console.log("response :: ", response);
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }

  chargeCard(token: string) {
    console.log("token 22222 :: ", token);
        this._PaymentService.chargeCard(token).subscribe((data:any) => {
            console.log("final res ::", data);
          },
          error => {
            console.log("Error pleas check !! => " + error.status);
        });
  }

  getToken() {
    this.message = 'Loading...';

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        this.message = `Success! Card token ${response.card.id}.`;
        this.chargeCard(response.id);
      } else {
        this.message = response.error.message;
      }
    });
  }

  
}
