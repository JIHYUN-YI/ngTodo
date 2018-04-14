import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {
  todoList: TodoVO[] = [];

  constructor(private userSerivce: UserService) { }

  ngOnInit() {
    this.userSerivce.getTodoList()
      .subscribe( body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

}
