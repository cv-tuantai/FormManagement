import {
  ADD_STUDENT,
  DEL_STUDENT,
  EDIT_STUDENT,
  UPDATE_STUDENT,
  GET_KEYWORD,
} from "./constants";

const actAddStudent = (student) => {
  return {
    type: ADD_STUDENT,
    payload: student,
  };
};

const actDelStudent = (maSV) => {
  return {
    type: DEL_STUDENT,
    payload: maSV,
  };
};

const actEditStudent = (student) => {
  return {
    type: EDIT_STUDENT,
    payload: student,
  };
};

const actUpdateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    payload: student,
  };
};

const actGetKeyword = (keyword) => {
  return {
    type: GET_KEYWORD,
    payload: keyword,
  };
};

export {
  actAddStudent,
  actDelStudent,
  actEditStudent,
  actUpdateStudent,
  actGetKeyword,
};
