import {
  ADD_STUDENT,
  DEL_STUDENT,
  EDIT_STUDENT,
  UPDATE_STUDENT,
  GET_KEYWORD,
} from "./constants";

const initState = {
  studentArr: [
    {
      maSV: 1,
      hoTen: "Nguyễn Văn A",
      phone: "0987654321",
      email: "nguyenvana@gmail.com",
    },
    {
      maSV: 2,
      hoTen: "Nguyễn Văn B",
      phone: "0987657867",
      email: "nguyenvanb@gmail.com",
    },
  ],
  studentEdit: null,
  keyword: "",
};

export const qlsvReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_STUDENT: {
      let studentArrClone = [...state.studentArr];

      const index = studentArrClone.findIndex(
        (user) => user.maSV == action.payload.maSV,
      );

      if (index !== -1) {
        alert("Mã SV đã tồn tại");
      } else {
        // add
        studentArrClone.push(action.payload);
      }

      state.studentArr = studentArrClone;
      return { ...state };
    }

    case DEL_STUDENT: {
      let studentArrClone = [...state.studentArr];

      const index = studentArrClone.findIndex(
        (student) => student.maSV === action.payload,
      );

      if (index !== -1) {
        studentArrClone.splice(index, 1);

        state.studentArr = studentArrClone;
      }

      return { ...state };
    }

    case EDIT_STUDENT: {
      state.studentEdit = action.payload;
      return { ...state };
    }

    case UPDATE_STUDENT: {
      let studentArrClone = [...state.studentArr];

      const index = studentArrClone.findIndex(
        (student) => student.maSV === action.payload.maSV,
      );

      if (index !== -1) {
        studentArrClone[index] = action.payload;

        state.studentArr = studentArrClone;
      }

      return { ...state };
    }

    case GET_KEYWORD: {
      state.keyword = action.payload;

      return { ...state };
    }

    default:
      return { ...state };
  }
};
