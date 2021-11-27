import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fewo-willrich';

  constructor(private httpClient: HttpClient) { 
	  console.log("alskdjasdjlkasdjlka");
	  this.sendGetRequest();
  }

  public sendGetRequest(){

  	//const headers = new HttpHeaders().set('Content-Type', 

    this.httpClient.get('https://udx62k4em2.execute-api.eu-central-1.amazonaws.com/prod/newEntry').subscribe(val => console.log(val));
  }

  //events1 = this.HttpClient.get('https://halle-online-kalender.s3.eu-central-1.amazonaws.com/db.json');

//console.log(alskdjasdjlkasdjlka");


  events = {
	"events": ["Hello World","Hello World1","Hello World2"]
	}
}
