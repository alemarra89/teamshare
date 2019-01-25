import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;

  posts: any[];

  private topicSubscription: Subscription;

  constructor(
    private rxStompService: RxStompService,
    private usersService: UsersService,
    private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(
      res => {
        this.posts = res;
        this.topicSubscription = this.rxStompService.watch('/events/*').subscribe((message: Message) => {
          const event = JSON.parse(message.body);
          if (event.type === 'PostCreated') {
            this.posts.unshift(event.payload.entity);
          }
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.topicSubscription) {
      this.topicSubscription.unsubscribe();
    }
  }

  inserisciPost() {
    console.log(this.form.value);
    const post = {
      titoloPost: this.form.value.titolo,
      descrizionePost: this.form.value.descrizione,
      dataPost: this.form.value.data
    };
    this.postsService.inserisciPost(post);
  }

}
