const actions = {
  GET_GALLERY: 'GET_GALLERY',
  UPDATE_GALLERY: 'UPDATE_GALLERY',
  UPDATE_GALLERY_SAGA: 'UPDATE_GALLERY_SAGA',
  SELECT_CURRENT_GALLERY: 'SELECT_CURRENT_GALLERY',
  TOGGLE_VIEW: 'GALLERY_TOGGLE_VIEW',
  UPDATE_EDIT_GALLERY: 'GALLERY_UPDATE_EDIT_GALLERY',
  DELETE_GALLERY_REQUEST: 'DELETE_GALLERY_REQUEST',
  DELETE_GALLERY_SUCCESS: 'DELETE_GALLERY_SUCCESS',
  initData: () => ({ type: actions.GET_GALLERY }),
  deleteGalleryRequest: id => ({
    type: actions.DELETE_GALLERY_REQUEST,
    id
  }),
  updateGallery: gallery => {
    return (dispatch, getState) => {
      const galleries = getState().Galleries.galleries;
      const index = galleries.map(inv => inv.id).indexOf(gallery.id);
      if (index === -1) {
        galleries.push(gallery);
      } else {
        galleries[index] = gallery;
      }
      dispatch({
        type: actions.UPDATE_GALLERY_SAGA,
        galleries,
        gallery,
      });
    };
  },
  selectCurrentGallery: id => ({ type: actions.SELECT_CURRENT_GALLERY, id }),
  toggleView: view => ({ type: actions.TOGGLE_VIEW, view }),
  editGallery: gallery => ({ type: actions.UPDATE_EDIT_GALLERY, gallery }),
};
export default actions;
