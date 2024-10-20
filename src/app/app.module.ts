import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


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
import { ClientComponent } from './client/client.component';
import { ClientNavBarComponent } from './client-nav-bar/client-nav-bar.component';
import { ClientCataloguesComponent } from './client-catalogues/client-catalogues.component';
import { ClientNouvellesCommandesComponent } from './client-nouvelles-commandes/client-nouvelles-commandes.component';
import { ClientAnciennesCommandesComponent } from './client-anciennes-commandes/client-anciennes-commandes.component';
import { ClientNouvellesReclamationsComponent } from './client-nouvelles-reclamations/client-nouvelles-reclamations.component';
import { ClientAnciennesReclamationsComponent } from './client-anciennes-reclamations/client-anciennes-reclamations.component';
import { ClientProfilComponent } from './client-profil/client-profil.component';
import { ClientCatalogueMedicamentsComponent } from './client-catalogue-medicaments/client-catalogue-medicaments.component';
import { CreateCompteClientComponent } from './create-compte-client/create-compte-client.component';
import { ClientPanierComponent } from './client-panier/client-panier.component';
import { ClientCatalogueDispositifsMedicauxComponent } from './client-catalogue-dispositifs-medicaux/client-catalogue-dispositifs-medicaux.component';
import { FooterComponent } from './footer/footer.component';
import { ClientCommandeDetailComponent } from './client-commande-detail/client-commande-detail.component';

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
    AgentGestionLivraisonsComponent,
    ClientComponent,
    ClientNavBarComponent,
    ClientCataloguesComponent,
    ClientNouvellesCommandesComponent,
    ClientAnciennesCommandesComponent,
    ClientNouvellesReclamationsComponent,
    ClientAnciennesReclamationsComponent,
    ClientProfilComponent,
    ClientCatalogueMedicamentsComponent,
    CreateCompteClientComponent,
    ClientPanierComponent,
    ClientCatalogueDispositifsMedicauxComponent,
    FooterComponent,
    ClientCommandeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
