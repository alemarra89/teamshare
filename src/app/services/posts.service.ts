import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient,
    private usersService: UsersService) { }

  getPosts(): Observable<any> {
    return this.http.get(environment.baseUrl + 'private/posts/');
  }

  inserisciPost(post): any {
    post.idUtente = this.usersService.loggedUser.id;
    post.dataPost = new Date();
    this.http.post(environment.baseUrl + 'private/posts/', post)
      .subscribe(
        (res) => {
          return true;
        }
      );
  }

}
