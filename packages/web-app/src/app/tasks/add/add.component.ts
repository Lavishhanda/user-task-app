import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task, TaskPriority } from '@take-home/shared';
import { StorageService } from '../../storage/storage.service';
import { faker } from '@faker-js/faker';
import { dateRangeValidator } from '../../../../../shared/src/lib/custom-validations';

@Component({
    selector: 'take-home-add-component',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: false
})
export class AddComponent {
  
  protected addTaskForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required,Validators.minLength(10)]),
    description: new FormControl(null),
    priority: new FormControl(
      { value: TaskPriority.MEDIUM, disabled: false },
      {
        validators: Validators.required,
      },
    ),
    scheduledDate : new FormControl(null,[dateRangeValidator()])
  });
  protected priorities = Object.values(TaskPriority);

  constructor(private storageService: StorageService, private router: Router) {
  }

  async onSubmit() {
    const newTask: Task = {
      ...this.addTaskForm.getRawValue(),
      uuid: faker.string.uuid(),
      isArchived: false,
      scheduledDate : this.addTaskForm.get('scheduledDate')?.value,
      // TODO: allow user to set scheduled date using MatDatePicker
    };
    await this.storageService.addTaskItem(newTask);
    await this.storageService.updateTaskItem(newTask);

    this.router.navigateByUrl('/');
    // TODO: save updated task to storage
    // TODO: navigate to home page
    //throw new Error('Not implemented');
  }

  onCancel(): void {
    this.router.navigateByUrl('/');
    // TODO: navigate to home page
    //throw new Error('Not implemented');
  }

  
}
