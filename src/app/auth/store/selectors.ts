import { AuthStateInterface } from "../types/authState.interface";
import { createSelector } from "@ngrx/store";

export const selectAuthState = (state: { auth: AuthStateInterface }) => state.auth;

export const selectIsSubmitting = createSelector(
  selectAuthState,
  (authState: AuthStateInterface) => authState.isSubmitting
);