import { Component } from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
  onSubmit() {

    if (!this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
      (response) => {
        this.response = `Upload successful: ${response}`;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
