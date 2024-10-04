import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-gestion-comptes',
  templateUrl: './agent-gestion-comptes.component.html',
  styleUrl: './agent-gestion-comptes.component.css'
})
export class AgentGestionComptesComponent {

  public basculAccount: string= "client";







openClientAccountManager() {
  this.basculAccount = "client"
}

openAgentAccountManager() {
  this.basculAccount = "agent"
}

}
