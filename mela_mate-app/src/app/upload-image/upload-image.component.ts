import { Component, ComponentFactoryResolver, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  selectedFile: File | null = null;
  response: string = '';
  loading: boolean = false; // add a loading variable
  @ViewChild('responseContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private resolver: ComponentFactoryResolver
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit($event: { preventDefault: () => void; }) {
  $event.preventDefault();
  this.loading = true; // set loading to true
  if (!this.selectedFile) {
    return;
  }

  const formData = new FormData();
  formData.append('image', this.selectedFile);
  console.log(formData);

  this.http.post<any>('http://3.25.188.120:3000/upload-image', formData, { responseType: 'json' }).subscribe(
    (response) => {
      console.log(response);
      if (response && response.probability) {
        const probability = response.probability
        console.log(probability);
        this.renderResponse(probability);
      } else {
        console.error('Invalid response format');
      }
    },
    (error) => {
      console.error(error);
    },
    () => {
      this.loading = false; // set loading to false when response is received or when an error occurs
    }
    );
  }

    renderResponse(response: any) {
      var percentage = (100-(response*100)).toFixed(2)
      this.response = "There is a probability of " + percentage + "% that this might be melanoma."
    }
  }
