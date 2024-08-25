import { UserProfileInterface } from './userProfile.interface';

export interface ExtendedUserProfileStateInterface {
  isLoading: boolean;
  error: string | null;
  userProfile: UserProfileInterface | null;
  isCurrentUserProfile: boolean;
}
