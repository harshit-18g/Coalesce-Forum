import * as ActionTypes from './ActionTypes';
import { ITEMS } from '../shared/items';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchItems = () => (dispatch) => {

    dispatch(itemsLoading(true));

    setTimeout(() => {
        dispatch(addDishes(ITEMS));
    }, 2000);
}

export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const itemsFailed = (errmess) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errmess
});

export const addDishes = (items) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});