import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {

  loggedUser;

  constructor(private http: HttpClient) { }

  login(email, password): Subscription {
    const params = {
      email: email,
      password: password
    };
    return this.http.post<User>(environment.baseUrl + 'public/authentication/login', params).subscribe(
      (res: any) => {
        console.log(res);
        this.loggedUser = res;
        localStorage.setItem('jwt', this.loggedUser.jwt);
        return true;
      }
    );
  }

  insertUser(user: User): any {
    this.http.post<User>(environment.baseUrl + 'users/', user)
      .subscribe(
        (res) => {
          return true;
        }
      );
  }

  getUsers(): any {
    this.http.get<User>(environment.baseUrl + 'users/5')
      .subscribe(
        (res) => {
          console.log(res);
          return true;
        }
      );
  }

  getUsersMario(): any {
    this.http.get<User>(environment.baseUrl + 'stato')
      .subscribe(
        (res) => {
          console.log(res);
          return true;
        }
      );
  }

}
