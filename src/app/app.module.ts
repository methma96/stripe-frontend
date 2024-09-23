import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  // <-- Ensure FormsModule is imported here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
