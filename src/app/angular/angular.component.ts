import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {

  constructor(private userSerivce: UserService) { }

  ngOnInit() {
    this.userSerivce.getTodoList()
      .subscribe( body => console.log(body));
  }

}
