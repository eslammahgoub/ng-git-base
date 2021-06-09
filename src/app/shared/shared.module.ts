import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

// CUSTOM COMPONENTS
import { LogoComponent } from './customs';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    LogoComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
  ],
  exports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    LogoComponent,
  ]
})
export class SharedModule { }
