import { put, call, takeEvery, select } from 'redux-saga/effects';
import api from '../services/api';
import * as actions from '../actions';

export function* getTODOItems() {
  try {
    const items = yield call(api.getTODOItems);
    items.sort((prev, next) => next.order - prev.order);
    yield put(actions.getTODOItemsSuccess(items));
  } catch (err) {
    console.warn(err); // eslint-disable-line
  }
}

export function* createTODOItem(data) {
  try {
    const state = yield select();
    const lastItemOrder = state.TODO.list[0] ? state.TODO.list[0].order : 0;
    const newItemOrder = lastItemOrder + 1;

    const item = yield call(api.createTODOItem.bind(
      null,
      Object.assign({},
      data.item,
      { order: newItemOrder }),
    ));
    yield put(actions.createTODOItemSuccess(item));
  } catch (err) {
    console.warn(err); // eslint-disable-line
  }
}

export function* editTODOItem(data) {
  try {
    const item = yield call(api.editTODOItem.bind(null, data.id, data.item));
    yield put(actions.editTODOItemSuccess(item));
  } catch (err) {
    console.warn(err); // eslint-disable-line
  }
}

export function* removeTODOItem(data) {
  try {
    yield call(api.removeTODOItem.bind(null, data.id));
    yield put(actions.removeTODOItemSuccess(data.id));
  } catch (err) {
    console.warn(err); // eslint-disable-line
  }
}

export function* watchGetTODOItems() {
  yield takeEvery(actions.GET_TODO_ITEMS, getTODOItems);
}

export function* watchCreateTODOItem() {
  yield takeEvery(actions.CREATE_TODO_ITEM, createTODOItem);
}

export function* watchEditTODOItem() {
  yield takeEvery(actions.EDIT_TODO_ITEM, editTODOItem);
}

export function* watchRemoveTODOItem() {
  yield takeEvery(actions.REMOVE_TODO_ITEM, removeTODOItem);
}
