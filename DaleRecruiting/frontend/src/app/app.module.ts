import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './app.services/auth.service';
import { AuthGuardService } from './app.services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { JobsService } from './app.services/jobs.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddjobComponent } from './addjob/addjob.component';
import { ListPosComponent } from './list-pos/list-pos.component';
import { SearchListComponent } from './search-list/search-list.component';
import { AnagraficaComponent } from './anagrafica/anagrafica.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { UpdateComponent } from './update/update.component';
import { UpdPosComponent } from './upd-pos/upd-pos.component';
import { SearchComponent } from './search/search.component';
import { RicercaService } from './app.services/ricerca.service';
import { ResultComponent } from './result/result.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdSearchComponent } from './upd-search/upd-search.component';
import { ApplypositionComponent } from './applyposition/applyposition.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListComponent,
    SidebarComponent,
    AddjobComponent,
    ListPosComponent,
    SearchListComponent,
    AnagraficaComponent,
    GreetingsComponent,
    UpdateComponent,
    UpdPosComponent,
    SearchComponent,
    ResultComponent,
    UpdSearchComponent,
    ApplypositionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    Ng2SearchPipeModule
  ],
  providers: [AuthService, AuthGuardService, JobsService, RicercaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
