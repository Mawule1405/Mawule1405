import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AgentComponent } from './agent/agent.component';
import { AgentNavBarComponent } from './agent-nav-bar/agent-nav-bar.component';
import { CatalogueProduitsComponent } from './catalogue-produits/catalogue-produits.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AgentGestionCompteClientComponent } from './agent-gestion-compte-client/agent-gestion-compte-client.component';
import { AgentGestionCompteAgentComponent } from './agent-gestion-compte-agent/agent-gestion-compte-agent.component';
import { AgentGestionComptesComponent } from './agent-gestion-comptes/agent-gestion-comptes.component';
import { AgentGestionStocksComponent } from './agent-gestion-stocks/agent-gestion-stocks.component';
import { AgentGestionCommandesComponent } from './agent-gestion-commandes/agent-gestion-commandes.component';
import { AgentGestionReclamationsComponent } from './agent-gestion-reclamations/agent-gestion-reclamations.component';
import { AgentGestionLivraisonsComponent } from './agent-gestion-livraisons/agent-gestion-livraisons.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    RegistrationComponent,
    LoginComponent,
    AgentComponent,
    AgentNavBarComponent,
    CatalogueProduitsComponent,
    AgentGestionCompteClientComponent,
    AgentGestionCompteAgentComponent,
    AgentGestionComptesComponent,
    AgentGestionStocksComponent,
    AgentGestionCommandesComponent,
    AgentGestionReclamationsComponent,
    AgentGestionLivraisonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
