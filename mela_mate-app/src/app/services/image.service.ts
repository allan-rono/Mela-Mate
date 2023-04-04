import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageData: FormData | null = null;
  private melanomaProbability: number | null = null;

  constructor() { }

  setImageData(imageData: FormData) {
    this.imageData = imageData;
  }

  getImageData(): FormData | null {
    return this.imageData;
  }

  setMelanomaProbability(probability: number) {
    this.melanomaProbability = probability;
  }

  getMelanomaProbability(): number | null {
    return this.melanomaProbability;
  }
}
