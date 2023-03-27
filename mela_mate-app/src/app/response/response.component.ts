import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent {
  response = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.get('http://localhost:4200/response')
      .subscribe((response: any) => {
        this.response = response;
      });
  }
}
