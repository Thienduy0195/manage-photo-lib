import clone from 'clone';
import { newGallery } from './config';
import actions from './actions';

const initState = {
  galleries: [],
  initialGalleries: false,
  currentGallery: {},
  editableGallery: {},
  isNewGallery: false,
  enableEditView: false,
  loading: false,
  isLoadPage: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_GALLERY: {
      return {
        ...state,
        loading: true,
        isLoadPage: false
      };
    }
    case actions.DELETE_GALLERY_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case actions.DELETE_GALLERY_SUCCESS: {
      return {
        ...state,
        loading: false,
        isLoadPage: true
      };
    }
    case actions.UPDATE_GALLERY: {
      const currentGallery = action.gallery
        ? action.gallery
        : state.currentGallery;
      return {
        ...state,
        galleries: action.galleries,
        currentGallery: clone(currentGallery),
        initialGalleries: true,
        isNewGallery: false,
        enableEditView: false,
        loading: false
      };
    }
    case actions.SELECT_CURRENT_GALLERY: {
      const galleries = state.galleries;
      const index = galleries.map(gallery => gallery.id).indexOf(action.id);
      const isNewGallery = index === -1;
      const currentGallery = isNewGallery
        ? {
            id: action.id,
            number: `#${action.id}`,
            key: action.id,
            ...newGallery,
          }
        : galleries[index];
      const enableEditView = isNewGallery;
      return {
        ...state,
        currentGallery,
        isNewGallery,
        enableEditView,
        editableGallery: clone(currentGallery),
      };
    }
    case actions.TOGGLE_VIEW:
      return {
        ...state,
        enableEditView: action.view,
        editableGallery: clone(state.currentGallery),
      };
    case actions.UPDATE_EDIT_GALLERY:
      return {
        ...state,
        editableGallery: clone(action.gallery),
      };
    default:
      return state;
  }
}
