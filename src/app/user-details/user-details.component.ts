import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor() { }

  user: User = {id: "", username: "", discriminator: 0, avatar: "", locale: ""};

  ngOnInit(): void {
    let loggedUser: any = sessionStorage.getItem("userLogged");
    if (loggedUser) this.user = <User>JSON.parse(loggedUser);
  }

}
