import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule, routingcomp } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TableTestComponent } from './table-test/table-test.component';
import { TableTest2Component } from './table-test2/table-test2.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    routingcomp,
    HeaderComponent,
    FooterComponent,
    TableTest2Component,
    // TableTestComponent
    ListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
