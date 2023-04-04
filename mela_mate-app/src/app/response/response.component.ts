
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  @Input() response: any;
  //response!: string;
  responseMessage: string = "This is a test response message";
  melanomaProbability!: number |null;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*
    this.melanomaProbability = this.imageService.getMelanomaProbability();
    if (this.melanomaProbability === null) {
      this.router.navigateByUrl('/upload-image');
      console.log("Fail Test")
    } else {
      this.getResponse();
      console.log("Success Test")
    }
    */
  }

  getResponse() {
    const imageData = this.imageService.getImageData();
    if (!imageData) {
      this.response = 'No image data found in ImageService';
      return;
    }
    this.http.post<any>('http://localhost:3000/upload-image', imageData).subscribe(
      (response) => {
        const melanomaProbability = response.melanomaProbability;
        this.imageService.setMelanomaProbability(melanomaProbability);
        this.melanomaProbability = melanomaProbability || 0; // add this line to handle null case
        this.response = `Melanoma probability: ${this.melanomaProbability}`;
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.response = 'Error processing image';
      }
    );
  }
}

