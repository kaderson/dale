import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { AddjobComponent } from './addjob/addjob.component';
import { AuthGuardService } from './app.services/auth-guard.service';
import { ListPosComponent } from './list-pos/list-pos.component';
import { AnagraficaComponent } from './anagrafica/anagrafica.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { UpdateComponent } from './update/update.component';
import { UpdPosComponent } from './upd-pos/upd-pos.component';
import { SearchComponent } from './search/search.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ResultComponent } from './result/result.component';
import { UpdSearchComponent } from './upd-search/upd-search.component';
import { ApplypositionComponent } from './applyposition/applyposition.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addCandidato', component: AnagraficaComponent },
  { path: 'greetings', component: GreetingsComponent },
  { path: 'candidati', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'candidati/:idCand', component: UpdateComponent, canActivate: [AuthGuardService] },
  { path: 'addRicerca', component: SearchComponent, canActivate: [AuthGuardService] },
  { path: 'ricerche', component: SearchListComponent, canActivate: [AuthGuardService] },
  { path: 'ricerche/:idRic', component: UpdSearchComponent, canActivate: [AuthGuardService] },
  { path: 'ricerche/cand/:idRic', component: ResultComponent, canActivate: [AuthGuardService] },
  { path: 'addSkill', component: AddjobComponent, canActivate: [AuthGuardService] },
  { path: 'skills', component: ListPosComponent, canActivate: [AuthGuardService]  },
  { path: 'skills/:idSkill', component: UpdPosComponent, canActivate: [AuthGuardService]  },
  { path: 'apply/:idRic', component: ApplypositionComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
