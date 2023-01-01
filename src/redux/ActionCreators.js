import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// export const addComment = (dishId, rating, author, comment) => ({
//   type: ActionTypes.ADD_COMMENT,
//   payload: {
//     dishId,
//     rating,
//     author,
//     comment,
//   },
// });

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId,
    rating,
    author,
    comment,
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log('post comments', error.message);
      alert('Your comment could not be posted\nError: ' + error.message);
    });
};

// FETCH GET
export const fetchDishes = () => async (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};
export const fetchComments = () => async (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
export const fetchPromos = () => async (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

// ADD
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});
export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

// FAILED
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});
export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

// LOADING
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});
export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});
