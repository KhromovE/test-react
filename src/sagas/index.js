import { fork } from 'redux-saga/effects';
import {
  getTODOItems,
  watchGetTODOItems,
  watchCreateTODOItem,
  watchRemoveTODOItem,
  watchEditTODOItem,
} from './TODO';

export default function* () {
  yield [
    fork(getTODOItems),
    fork(watchGetTODOItems),
    fork(watchCreateTODOItem),
    fork(watchRemoveTODOItem),
    fork(watchEditTODOItem),
  ];
}
