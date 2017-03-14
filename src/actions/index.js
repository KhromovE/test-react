export const GET_TODO_ITEMS = 'GET_TOTO_ITEMS';
export const GET_TODO_ITEMS_SUCCESS = 'GET_TODO_ITEMS_SUCCESS';
export const CREATE_TODO_ITEM = 'CREATE_TODO_ITEM';
export const CREATE_TODO_ITEM_SUCCESS = 'CREATE_TODO_ITEM_SUCCESS';
export const EDIT_TODO_ITEM = 'EDIT_TODO_ITEM';
export const EDIT_TODO_ITEM_SUCCESS = 'EDIT_TODO_ITEM_SUCCESS';
export const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM';
export const REMOVE_TODO_ITEM_SUCCESS = 'REMOVE_TODO_ITEM_SUCCESS';

export function getTODOItemsSuccess(items) {
  return {
    type: GET_TODO_ITEMS_SUCCESS,
    items,
  };
}

export function createTODOItem(item) {
  return {
    type: CREATE_TODO_ITEM,
    item,
  };
}

export function createTODOItemSuccess(item) {
  return {
    type: CREATE_TODO_ITEM_SUCCESS,
    item,
  };
}

export function editTODOItem(id, item) {
  return {
    type: EDIT_TODO_ITEM,
    id,
    item,
  };
}

export function editTODOItemSuccess(item) {
  return {
    type: EDIT_TODO_ITEM_SUCCESS,
    item,
  };
}

export function removeTODOItem(id) {
  return {
    type: REMOVE_TODO_ITEM,
    id,
  };
}

export function removeTODOItemSuccess(id) {
  return {
    type: REMOVE_TODO_ITEM_SUCCESS,
    id,
  };
}
