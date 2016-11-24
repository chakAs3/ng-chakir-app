import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule }  from '@angular/http';
import { MyAlgoliasearchModuleComponent } from './my-algoliasearch-module.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [MyAlgoliasearchModuleComponent],
  providers: [MyAlgoliasearchModuleComponent]
})
export class MyAlgoliasearchModuleModule {


 }
