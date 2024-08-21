import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RouterLink } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class LoginComponent {
  form: FormGroup;
  data$: Observable<{
    isSubmitting: boolean;
    backendErrors: BackendErrorsInterface | null;
  }>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit(): void {
    console.log('form: ', this.form.getRawValue());
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
  }
}
