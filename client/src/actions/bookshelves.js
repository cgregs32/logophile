import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const addBookshelf = bookshelf => {
  return dispatch => {
    axios
      .post('/api/bookshelves', { bookshelf }, setHeaders())
      .then(res => dispatch({ type: 'ADD_BOOKSHELF', bookshelf: res.data }))
      .catch(err =>
        dispatch(
          setFlash(
            `Could not create ${bookshelf.name}, please try again!`,
            'red'
          )
        )
      );
  };
};

export const fetchBookshelves = () => {
  return dispatch => {
    axios
      .get('/api/bookshelves/', setHeaders())
      .then(res => dispatch({ type: 'GET_BOOKSHELVES', bookshelves: res.data }))
      .catch(err =>
        setFlash('Could not retrieve bookshelves, please try again!', 'red')
      );
  };
};

export const editBookshelf = (id, bookshelf) => {
  return dispatch => {
    axios
      .put(`/api/bookshelves/${id}`, { bookshelf }, setHeaders())
      .then(res => {
        dispatch({ type: 'EDIT_BOOKSHELF', bookshelf: res.data });
        dispatch({ type: 'FETCH_SHELF', bookshelf: res.data });
      })
      .catch(err =>
        setFlash('Could not edit bookshelf, please try again!', 'red')
      );
  };
};

export const deleteBookshelf = shelf => {
  return dispatch => {
    axios
      .delete(`/api/bookshelves/${shelf.id}`, setHeaders())
      .then(() => {
        dispatch({ type: 'DELETE_BOOKSHELF', shelf });
        dispatch({ type: 'DELETE_SHELF' });
      })
      .catch(err =>
        setFlash('Could not delete bookshelf, please try again!', 'red')
      );
  };
};
