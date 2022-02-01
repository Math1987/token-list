import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    public user : UserService
  ) { }

  ngOnInit(): void {
  }
  update(){
    const pseudo = (document.querySelector('#pseudo') as HTMLInputElement).value;
    this.user.update({pseudo});
  }

}
