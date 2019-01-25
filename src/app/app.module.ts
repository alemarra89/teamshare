import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrazioneComponent } from './features/registrazione/registrazione.component';
import { UsersService } from './services/users.service';

import { AppRoutingModule } from './app-routing.module';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { PostsService } from './services/posts.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrazioneComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot()
  ],
  providers: [
    UsersService,
    PostsService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true
    },
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
