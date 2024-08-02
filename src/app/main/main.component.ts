import {Component, ElementRef, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AppBarComponent} from "../app-bar/app-bar.component";
import {Task, TaskService} from "../service/task.service";
import {AuthService} from "../service/auth.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AppBarComponent,
    MatCheckbox,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  taskList: Array<Task> = [];
  description = "";

  /* getting form reference */
  @ViewChild("frm")
  formRef!: ElementRef

  /* injecting services */
  constructor(titleService: Title,
              private authService: AuthService,
              protected taskService: TaskService) {
    titleService.setTitle('To-do list app');
    taskService.getTasks(authService.getPrincipalEmail()!).subscribe(
      taskList => {
        this.taskList = taskList;
        this.taskList.sort(
          /* compare function
          * to sort in descending order of task added time */
          (task1: Task, task2: Task) => {
            if (task1.timestamp.toMillis() > task2.timestamp.toMillis()) return -1;
            else if (task1.timestamp.toMillis() < task2.timestamp.toMillis()) return 1;
            else return 0;
          }
        )
      }
    );
  }

  // sortFn(task1: Task, task2: Task) {
  //
  //
  //   if (task1.timestamp.toMillis() > task2.timestamp.toMillis()) return 1;
  //   else if (task1.timestamp.toMillis() < task2.timestamp.toMillis()) return -1;
  //   else return 0;
  // }

  async addTask(txt: HTMLInputElement) {
    if (!this.description.trim().length) {
      txt.select();
      txt.focus();
      return;
    } else {
      try {
        await this.taskService.createNewTask(this.description,
          this.authService.getPrincipalEmail()!)
          .then(this.formRef.nativeElement.reset()); /* reset form after adding task */
      } catch (e) {
        console.log(e);
        alert('Failed to save the task, try again');
      }
    }
  }
}
