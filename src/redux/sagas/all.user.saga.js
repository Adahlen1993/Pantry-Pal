import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchAllUser(action) {
  try {
    const response = yield axios.get("/api/user/all");
    yield put({ type: "SET_ALL_USER", payload: response.data });
  } catch (error) {
    console.error(`Error getting all user`);
  }
}

function* deleteUser(action) {
  try {
    yield console.log(action.payload);
    yield axios.delete("/api/user/all", { data: action.payload });
    yield put({ type: "FETCH_USER_INGREDIENTS" });
  } catch (error) {
    console.error(`Error deleting user`);
  }
}

function* editUser(action) {
  try {
    yield axios.put(`/api/user/all`, action.payload);
    yield put({ type: "FETCH_ALL_USER" });
  } catch (error) {
    console.error(`Error editing user`);
  }
}

function* allUserSaga() {
  yield takeLatest("FETCH_ALL_USER", fetchAllUser);
  yield takeLatest("DELETE_USER", deleteUser);
  yield takeLatest("UPDATE_USER", editUser);
}

export default allUserSaga;
