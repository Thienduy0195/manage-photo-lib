const actions = {
  GET_POST: 'GET_POST',
  UPDATE_POST: 'UPDATE_POST',
  UPDATE_POST_SAGA: 'UPDATE_POST_SAGA',
  SELECT_CURRENT_POST: 'SELECT_CURRENT_POST',
  TOGGLE_VIEW: 'POST_TOGGLE_VIEW',
  UPDATE_EDIT_POST: 'POST_UPDATE_EDIT_POST',
  DELETE_POST_REQUEST: 'DELETE_POST_REQUEST',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
  initData: () => ({ type: actions.GET_POST }),
  deletePostRequest: id => ({
    type: actions.DELETE_POST_REQUEST,
    id
  }),
  updateInvoice: post => {
    return (dispatch, getState) => {
      const posts = getState().Posts.posts;
      const index = posts.map(inv => inv.id).indexOf(post.id);
      if (index === -1) {
        posts.push(post);
      } else {
        posts[index] = post;
      }
      dispatch({
        type: actions.UPDATE_POST_SAGA,
        posts,
        post,
      });
    };
  },
  selectCurrentInvoice: id => ({ type: actions.SELECT_CURRENT_POST, id }),
  toggleView: view => ({ type: actions.TOGGLE_VIEW, view }),
  editInvoice: post => ({ type: actions.DELETE_POST_REQUEST, post }),
};
export default actions;
