import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  response!: string;
  responseMessage: string = "This is a test response message";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getResponse() {
    this.http.get('http://localhost:3000/response').subscribe(
      (response: any) => {
        this.response = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
