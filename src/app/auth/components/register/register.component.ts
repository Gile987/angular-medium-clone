import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { register } from "../../store/actions";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
@Component({
  selector: "mc-register",
  templateUrl: "./register.component.html",
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  form: FormGroup;

  // to check out: why can't we use the form before we initialize it in the constructor
  // https://angular.dev/guide/forms/reactive-forms
  // check this out under 'alternatively': https://brandonclapp.com/getting-started-with-angular-reactive-forms
  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('form: ', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(register({ request }));
  }
}
