import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessages } from '../backendErrorMessages/backendErrorMessages.component';


@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
  imports: [BackendErrorMessages, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues!: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      title: '',
      description: '',
      body: '',
      tagList: '',
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are required');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };
    this.articleSubmit.emit(articleFormValues);
  }
}
