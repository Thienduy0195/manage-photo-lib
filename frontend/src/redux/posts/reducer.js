import clone from 'clone';
import { newPost } from './config';
import actions from './actions';

const initState = {
  posts: [],
  initialPosts: false,
  currentPost: {},
  editablePost: {},
  isNewPost: false,
  enableEditView: false,
  loading: false,
  isLoadPage: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_POST: {
      return {
        ...state,
        loading: true,
        isLoadPage: false
      };
    }
    case actions.DELETE_POST_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case actions.DELETE_POST_SUCCESS: {
      return {
        ...state,
        loading: true,
        isLoadPage: true
      };
    }
    case actions.UPDATE_POST: {
      const currentPost = action.post
        ? action.post
        : state.currentPost;
      return {
        ...state,
        posts: action.posts,
        currentPost: clone(currentPost),
        initialPosts: true,
        isNewPost: false,
        enableEditView: false,
        loading: false
      };
    }
    case actions.SELECT_CURRENT_POST: {
      const posts = state.posts;
      const index = posts.map(post => post.id).indexOf(action.id);
      const isNewPost = index === -1;
      const currentPost = isNewPost
        ? {
            id: action.id,
            number: `#${action.id}`,
            key: action.id,
            ...newPost,
          }
        : posts[index];
      const enableEditView = isNewPost;
      return {
        ...state,
        currentPost,
        isNewPost,
        enableEditView,
        editablePost: clone(currentPost),
      };
    }
    case actions.TOGGLE_VIEW:
      return {
        ...state,
        enableEditView: action.view,
        editablePost: clone(state.currentPost),
      };
    case actions.UPDATE_EDIT_POST:
      return {
        ...state,
        editablePost: clone(action.post),
      };
    default:
      return state;
  }
}
