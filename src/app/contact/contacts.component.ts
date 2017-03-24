import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../service/contacts.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  contacts = [];

  selectedContact = {};
  isEditing = false;

  addContactForm: FormGroup;

  constructor(
    private contactsService: ContactsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getContacts();

    this.addContactForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  getContacts() {
    console.log("getContacts()");
    this.contactsService.getAllContacts().subscribe(
      data => this.contacts = data,
      error => console.log(error),
      () => console.log('callback')
    );
  }

  addContact() {
    this.contactsService.addContact(this.addContactForm.value).subscribe( // this.contactsService.addContact(this.addContactForm.value) --> Obervable
      res => {
        const newContact = res.json();
        this.contacts.push(newContact);
        this.addContactForm.reset();
      },
      error => console.log(error)
    );
  }

  deleteContact(contact) {
    this.contactsService.deleteContact(contact).subscribe(
      res => {
        const pos = this.contacts.map(elem => {
          console.log(elem);
          return elem._id;
        }).indexOf(contact._id);
        this.contacts.splice(pos, 1);
      },
      error => console.log(error)
    );
  }


  editContact() {
    this.contactsService.editContact(this.selectedContact).subscribe(
      res => {
        this.isEditing = false;
        this.getContacts(); // 이걸 안써도 되네?
      }
    );
  }

  enableEditing(contact) {
    this.isEditing = true;
    this.selectedContact = contact;
  }
  cancelEditing() {
    this.isEditing = false;
    this.selectedContact = {};
    this.getContacts();
  }

}
