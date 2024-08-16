import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    GetFeed: props<{ url: string }>(),
    GetFeedSuccess: props<{ feed: GetFeedResponseInterface }>(),
    GetFeedFailure: emptyProps(),
  },
});
