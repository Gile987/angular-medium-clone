import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { combineLatest, filter, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
import { CurrentUserRequestInterface } from '../../../shared/types/currentUserRequest.interface';
import { authActions } from '../../../auth/store/actions';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessages],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  currentUser?: CurrentUserInterface;
  data$!: Observable<{
    isSubmitting: boolean;
    backendErrors: BackendErrorsInterface | null;
  }>;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeDataStream();
    this.subscribeToCurrentUser();
  }

  private initializeForm(): void {
    this.form = this.fb.nonNullable.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    });
  }

  private initializeDataStream(): void {
    this.data$ = combineLatest({
      isSubmitting: this.store.pipe(select(selectIsSubmitting)),
      backendErrors: this.store.pipe(select(selectValidationErrors)),
    });
  }

  private subscribeToCurrentUser(): void {
    this.store
      .pipe(
        select(selectCurrentUser),
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.patchFormValues();
      });
  }

  private patchFormValues(): void {
    if (!this.currentUser) {
      throw new Error('User is not defined');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('User is not defined');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };
    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
