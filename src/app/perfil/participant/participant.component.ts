import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../../models/participant'
import { ParticipantInvitations } from '../../models/ParticipantInvitations'
import { MCoffeeService } from '../../services/m-coffee.service'
import {SnackBarServicesService} from '../../services/snack-bar-services.service'

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})

export class ParticipantComponent implements OnInit {
  @Input() participant: Participant;
  @Input() participantInvitations: ParticipantInvitations
  @Input() coffeeId: number;
  @Input() disabledInvitar: boolean;
  Show: boolean = false;
  acceptedInvitation: boolean = false;
  constructor(private mCoffeeService: MCoffeeService,private snack:SnackBarServicesService) { }

  ngOnInit() {
    this.mCoffeeService.getAcceptedInvitation().subscribe(result => { this.acceptedInvitation = result; })
    setTimeout(() => {this.acceptedInvitation = this.mCoffeeService.hasInvitationAccepted();});
    //console.log('Estoy en participant: '+this.participant.name)
    //console.log('Estoy en participantList: '+this.participantInvitations.name)
  }
  displayshow() {
    return this.Show;
  }

  sendInvitation() {
    this.mCoffeeService.sendInvitation(this.participant.user_id, this.coffeeId).subscribe(
      data => {
        this.snack.notificationChange(["info","Enviando invitacion.."])
        this.mCoffeeService.loadParticipantList(this.coffeeId).subscribe(data => {
        this.snack.notificationChange(["successful","Invitacion enviada con exito!"])});
      }
    )
  }

  acceptInvitation() {
    //this.mCoffeeService.acceptInvitation(this.participantInvitations.invitation_id);
    this.mCoffeeService.acceptInvitation(this.participantInvitations.invitation_id).subscribe(
      data => {this.snack.notificationChange(["info","Se acepto la invitacion"]) }
    )
  }
}
