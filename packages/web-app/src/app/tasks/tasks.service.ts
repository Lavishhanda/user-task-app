import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskPriority } from '@take-home/shared';
import { StorageService } from '../storage/storage.service';
import Fuse from 'fuse.js';


@Injectable({ providedIn: 'root' })
export class TasksService {
  tasks: Task[] = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {}

  getTasksFromApi(): Observable<Task[]> {
    const endpointUrl = '/api/tasks';
    return this.http.get<Task[]>(endpointUrl);
  }

  async getTasksFromStorage(): Promise<void> {
    this.tasks = await this.storageService.getTasks();
    this.filterTask('isArchived');
  }

  filterTask(key: keyof Task): void {
    switch (key) {
      case 'isArchived':
        this.tasks = this.tasks.filter((task) => !task.isArchived);
        break;
      case 'priority':
        this.tasks  = this.tasks.filter((task) => task.priority === TaskPriority.HIGH);
        break;
        // TODO: add fitler for taks with High Priority
      case 'scheduledDate':
        this.tasks = this.tasks.filter((task) => new Date(task.scheduledDate).getDate() === new Date().getDate());
        break;
        // TODO: add fitler for tasks Due Today
      case 'completed':
        this.tasks = this.tasks.filter((task) => !task.completed);
    }
  }

   async searchTask(search: string): Promise<void>{
// const fuse = new Fuse(this.tasks, {
    //   keys : [
    //     'title'
    //   ]
    // });
    if (search) {
      await this.getTasksFromStorage();
      // fuse search
      //this.tasks = fuse.search(search.toLowerCase()).map((task) => task.item);
      // regular seach
      const filteredTasks = this.tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
        this.tasks.length = 0; 
        this.tasks.push(...filteredTasks); 
    } else {
      await this.getTasksFromStorage();
      // TODO: reload all tasks from storage
    }
  }
}
