import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AgentComponent} from "./agent/agent.component";
import { CatalogueProduitsComponent } from './catalogue-produits/catalogue-produits.component';
import { AgentGestionCompteAgentComponent } from './agent-gestion-compte-agent/agent-gestion-compte-agent.component';
import { AgentGestionCompteClientComponent } from './agent-gestion-compte-client/agent-gestion-compte-client.component';
import { AgentGestionComptesComponent } from './agent-gestion-comptes/agent-gestion-comptes.component';
import {AgentGestionStocksComponent} from "./agent-gestion-stocks/agent-gestion-stocks.component";
import {AgentGestionReclamationsComponent} from "./agent-gestion-reclamations/agent-gestion-reclamations.component";
import {AgentGestionLivraisonsComponent} from "./agent-gestion-livraisons/agent-gestion-livraisons.component";
import {AgentGestionCommandesComponent} from "./agent-gestion-commandes/agent-gestion-commandes.component";
import { ClientComponent } from './client/client.component';
import {ClientCataloguesComponent} from "./client-catalogues/client-catalogues.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "agent", component: AgentComponent},
  {path: "agent/catalogue", component: CatalogueProduitsComponent},
  {path: "agent/comptes/agents", component: AgentGestionCompteAgentComponent},
  {path: "agent/comptes/clients", component: AgentGestionCompteClientComponent},
  {path: "agent/comptes", component: AgentGestionComptesComponent},
  {path: "agent/gestion-stocks", component: AgentGestionStocksComponent},
  {path: "agent/gestion-reclamations", component : AgentGestionReclamationsComponent},
  {path: "agent/gestion-livraisons", component: AgentGestionLivraisonsComponent},
  {path: "agent/gestion-commandes", component : AgentGestionCommandesComponent},
  //Les composants client
  {path: "client", component: ClientComponent},
  {path: "client/catalogues/tous-les-produits", component: ClientCataloguesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
