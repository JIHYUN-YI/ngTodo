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
  tempTodoMap = new Map<number, TodoVO>();

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

  save(todo: TodoVO) {
    // 템플릿 전환
    todo.isEdited = true;

    // 기존값 전환
    // const tempTodo = new TodoVO();
    // tempTodo.todo_id = todo.todo_id;
    // tempTodo.todo = todo.todo;
    // tempTodo.isFinished = todo.isFinished;

    // deep copy하는 두 가지 방법, Object.assgin, es6의 spread 연산자
    const tempTodo = Object.assign({}, todo);
    this.tempTodoMap.set(tempTodo.todo_id, tempTodo);

  }

  restore(todo: TodoVO) {
    // 기존값 복원
    const tempTodo = this.tempTodoMap.get(todo.todo_id);
    Object.assign(todo, tempTodo);

    // 템플릿 변경
    todo.isEdited = false;

  }

}
