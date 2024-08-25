import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GetUserProfileResponseInterface } from '../types/getUserProfileResponse.interface';
import { map } from 'rxjs';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string) {
    const url = `${environment.apiUrl}/profiles/${slug}`;
    return this.http
      .get<GetUserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
