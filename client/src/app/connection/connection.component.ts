import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolWalletsService } from 'angular-sol-wallets';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  menu : boolean = false ;

  constructor(
    public userS : UserService,
    public walletS : SolWalletsService,
    public router : Router
  ) { }

  ngOnInit(): void {
  }

  account(){
    this.menu = !this.menu ;
  }
  disconnect(){
    this.userS.disconnect();
    this.menu = false ;
  }
  settings(){
    this.router.navigate(['/settings']);
    this.menu = false ;
  }

}
