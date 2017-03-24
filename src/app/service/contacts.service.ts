import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactsService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getAllContacts(): Observable<any> {
    return this.http.get('/contacts')
      .map(res => res.json());
  }

  addContact(contact): Observable<any> {
    return this.http.post('/contact', JSON.stringify(contact), this.options);
  }

  deleteContact(contact): Observable<any> {
    return this.http.delete(`/contact/${contact._id}`, this.options);
  }

  editContact(contact): Observable<any> {
    return this.http.put(`/contact/${contact._id}`, JSON.stringify(contact), this.options);
  }
}
