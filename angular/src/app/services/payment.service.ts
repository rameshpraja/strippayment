import {Injectable} from "@angular/core";
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PaymentService {
 	headers: Headers;
    options: RequestOptions;
    
    constructor(private http:Http) {
      this.headers = new Headers({ 
	  'Content-Type': 'application/json', 'Accept': 'application/json'
	  });
        this.options = new RequestOptions({ headers: this.headers });
    }
	
    chargeCard(token: string):Observable<any[]>{
     let body = JSON.stringify({ token: token});
        console.log("Body => : "+ body );
        return this.http.post('http://localhost:3000/api/charge/customer', body, this.options)
         .map((response: Response) => {
                let custRes = response.json();
                return custRes;
            });
    }
}
