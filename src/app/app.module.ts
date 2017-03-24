import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsService } from './service/contacts.service';
import { ContactsComponent } from './contact/contacts.component';
import { AboutComponent } from './about/about.component';


const ROUTES = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
