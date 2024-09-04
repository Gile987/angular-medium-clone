import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }
  get<T>(key: string): T | null {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? (JSON.parse(localStorageItem) as T) : null;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
