import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  range(start: number, end: number): number[] {
    if (start > end) {
      console.error('Start should be less than or equal to end');
      return [];
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
