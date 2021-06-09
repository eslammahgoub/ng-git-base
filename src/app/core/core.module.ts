import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RepositoryService } from '@core/services';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    RepositoryService,
  ]
})
export class CoreModule { }
