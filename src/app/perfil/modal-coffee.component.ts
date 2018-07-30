import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../models/participant';
import { ParticipantInvitations } from '../models/ParticipantInvitations';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { MCoffeeService } from '../services/m-coffee.service'



@Component({
  selector: 'modal-coffee',
  templateUrl: './modal-coffee.component.html',
  styleUrls: ['./modal-coffee.component.css']
})
export class ModalCoffeeComponent implements OnInit {
  @Input() coffeeId: number;
  disabledInvitar: boolean = false;
  Show: boolean = false;
  ParticipantList: Participant[]
  ParticipantInvitationsList: ParticipantInvitations[]
  constructor(private mCoffeeService: MCoffeeService) {
  }

  ngOnInit() {
    this.disabledInvitar = false;
    this.mCoffeeService.getParticipantListObservable$().subscribe(
      data => {
        this.ParticipantList = data
      })
    this.mCoffeeService.getParticipantList(this.coffeeId)
    this.mCoffeeService.getParticipantInvitationsListObservable$().subscribe(
      data => {
        this.ParticipantInvitationsList = data;
        this.disabledInvitar = this.mCoffeeService.hasInvitationSent();
      })
    this.mCoffeeService.getParticipantInvitationsList(this.coffeeId)
  }

  displayshow() {
    return this.Show;
  }
}
