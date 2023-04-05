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
  @ViewChild('responseContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private resolver: ComponentFactoryResolver
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit($event: { preventDefault: () => void; }) {
    console.log("Submitting form...");
    $event.preventDefault();

    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post<any>('http://localhost:3000/upload-image', formData).subscribe(
      (response) => {
        const melanomaProbability = response.melanomaProbability;
        this.renderResponse(melanomaProbability);
      },
      (error) => {
        console.log(error);
      }
    );
  }




  renderResponse(response: any) {
    var percentage = (100-(response*100)).toFixed(2)
    this.response = "There is a probability of " + percentage + "% that this might be melanoma."

  }
}
