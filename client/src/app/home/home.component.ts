import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolWalletsService } from 'angular-sol-wallets';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public userS : UserService,
    public walletS : SolWalletsService
  ) { }

  ngOnInit(): void {
  }
  play(){
    // this.walletS.signAndSendTransfer()
  }


}
