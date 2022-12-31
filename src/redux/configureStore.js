import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      // createForms sudah otomatis membuatkan reducer, action dan lainnya
      ...createForms({
        feedback: InitialFeedback,
      }),
    }),
    // sebelum masuk ke store, action akan diolah di middleware thunk terlebih dulu
    applyMiddleware(thunk, logger)
  );

  return store;
};
