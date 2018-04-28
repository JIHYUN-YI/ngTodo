import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('In', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => *', [
        style({transform: 'translate(-100%, 0)'}),
        animate(300)
      ])
    ])
  ]
})
export class AngularComponent implements OnInit {
  todoList: TodoVO[] = [];
  newTodo = new TodoVO();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getTodoList()
      .subscribe( body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

  addTodo() {
    this.userService.addTodo(this.newTodo)
      .subscribe(body => {
        // todoList 맨 앞에 삽입
        this.todoList.unshift(body);
      });
  }

}
