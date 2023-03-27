import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ResponseComponent } from './response/response.component';

const routes: Routes = [
  { path: 'upload-image', component: UploadImageComponent },
  { path: 'response', component: ResponseComponent },
  { path: '', redirectTo: '/upload-image', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
