import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegistrazioneComponent } from './features/registrazione/registrazione.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registrazione', component: RegistrazioneComponent },
    { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
