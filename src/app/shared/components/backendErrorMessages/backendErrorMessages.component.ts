import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.updateErrorMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['backendErrors']) {
      console.log('changes', changes);
      this.updateErrorMessages();
    }
  }

  private updateErrorMessages(): void {
    if (!this.backendErrors) {
      this.errorMessages = [];
      return;
    }

    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(', ');
      return `${name}: ${messages}`;
    });
  }
}
