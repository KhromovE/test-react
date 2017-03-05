import * as actions from '../actions';

const initialState = {
  list: [],
  processing: true,
};

const TODOReducer = function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_TODO_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        list: action.items,
        processing: false,
      });
    case actions.CREATE_TODO_ITEM_SUCCESS:
      return Object.assign({}, state, {
        list: [action.item, ...state.list],
      });
    case actions.REMOVE_TODO_ITEM_SUCCESS:
      const removedItemIndex = state.list.findIndex(element => element.id === action.id);
      return Object.assign({}, state, {
        list: [...state.list.slice(0, removedItemIndex), ...state.list.slice(removedItemIndex + 1)],
      });
    case actions.EDIT_TODO_ITEM_SUCCESS:
      const editedItemIndex = state.list.findIndex(element => element.id === action.item.id);
      const list = [
        action.item,
        ...state.list.slice(0, editedItemIndex),
        ...state.list.slice(editedItemIndex + 1),
      ].sort((prev, next) => next.order - prev.order);
      return Object.assign({}, state, {
        list,
      });
    default:
      return state;
  }
};

export default TODOReducer;
