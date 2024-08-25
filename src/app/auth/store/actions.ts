import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register Failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login Success': props<{ currentUser: CurrentUserInterface }>(),
    'Login Failure': props<{ errors: BackendErrorsInterface }>(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: CurrentUserInterface }>(),
    'Get Current User Failure': emptyProps(),

    'Update Current User': props<{
      currentUserRequest: CurrentUserRequestInterface;
    }>(),
    'Update Current User Success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    'Update Current User Failure': props<{ errors: BackendErrorsInterface }>(),

    Logout: emptyProps(),
  },
});
