import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  @ViewChild('f') formRef: NgForm;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  registrati(/*form*/) {
    // console.log(form);
    console.log(this.formRef.value);
    const user: User = this.formRef.value;

    this.usersService.insertUser(user);
    // effettuare l'inject di un service
    // nel service deve essere presente
    // la chiamata http (POST users)
  }

  getDaMario() {
    this.usersService.getUsers();
  }
}
