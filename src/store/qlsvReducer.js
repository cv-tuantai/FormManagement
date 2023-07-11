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
    // thêm sinh viên
    case ADD_STUDENT: {
      let studentArrClone = [...state.studentArr];

      const index = studentArrClone.findIndex(
        (user) => user.maSV == action.payload.maSV,
      );

      // kiểm tra khi thêm sinh viên, nếu maSV trùng với sinh viên đã có thì alert và không thêm vào mảng
      if (index !== -1) {
        alert("Mã SV đã tồn tại");
      } else {
        // nếu chưa có ID thì thêm vào
        studentArrClone.push(action.payload);
      }

      // cập nhật state
      state.studentArr = studentArrClone;
      return { ...state };
    }

    // xóa sinh viên
    case DEL_STUDENT: {
      let studentArrClone = [...state.studentArr];

      const index = studentArrClone.findIndex(
        (student) => student.maSV === action.payload,
      );

      // kiểm tra khi xóa sinh viên, nếu maSV tồn tại thì xóa ra khỏi mảng
      if (index !== -1) {
        studentArrClone.splice(index, 1);

        // cập nhật lại state
        state.studentArr = studentArrClone;
      }

      return { ...state };
    }

    // sửa sinh viên
    case EDIT_STUDENT: {
      // cập nhật state, studentEdit
      state.studentEdit = action.payload;
      return { ...state };
    }

    // cập nhật sinh viên
    case UPDATE_STUDENT: {
      let studentArrClone = [...state.studentArr];

      const index = studentArrClone.findIndex(
        (student) => student.maSV === action.payload.maSV,
      );

      // kiểm tra khi cập nhật, nếu maSV có trong mảng thì thay sinh viên bằng dữ liệu mới
      if (index !== -1) {
        studentArrClone[index] = action.payload;

        // cập nhật state
        state.studentArr = studentArrClone;
      }

      return { ...state };
    }

    case GET_KEYWORD: {
      // cập nhật state.keyword
      state.keyword = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
