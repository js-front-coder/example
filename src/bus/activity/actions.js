import { createActions } from 'redux-actions';

export const activityActions = createActions({
  //Sync
  FILL_ACTIVITY: data => data,
  OPEN_INFO_MODAL: id => id,
  CLOSE_INFO_MODAL: void 0,

  //Async
  FETCH_ACTIVITY_ASYNC: type => type
});
