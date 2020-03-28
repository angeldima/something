import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { HeaderComponent } from './ui-template/header/header.component';
import { FooterComponent } from './ui-template/footer/footer.component';
import { LayoutComponent } from './ui-template/layout/layout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomepageComponent,
    Page1Component,
    Page2Component,
    Page3Component
  ],
  imports: [BrowserModule, AppRoutingModule, AmplifyAngularModule],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
