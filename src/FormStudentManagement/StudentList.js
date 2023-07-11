import React, { Component } from "react";
import { connect } from "react-redux";
import { actDelStudent } from "../store/action";
import { actEditStudent } from "../store/action";

class StudentList extends Component {
  renderList = () => {
    // bóc tách từ props
    let { studentArr, keyword } = this.props;

    // filter
    studentArr = studentArr.filter(
      (student) =>
        student.hoTen.toLowerCase().indexOf(keyword.toLowerCase()) !== -1,
    );

    // nếu studentArr tồn tại (không phải null hoặc undefined) thì dùng map để render ra list student
    return studentArr?.map((student) => {
      return (
        <tr key={student.maSV}>
          <td>{student.maSV}</td>
          <td>{student.hoTen}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td className="text-center">
            <button
              className="btn btn-warning"
              onClick={() => {
                this.props.editStudent(student);
              }}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => {
                if (window.confirm("Bạn có chắc muốn xóa sinh viên này?")) {
                  this.props.deleteStudent(student.maSV);
                }
              }}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr className="bg-dark text-white">
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th className="text-center">
                  <i className="fa fa-cog"></i>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentArr: state.qlsvReducer.studentArr,
    keyword: state.qlsvReducer.keyword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (maSV) => {
      dispatch(actDelStudent(maSV));
    },

    editStudent: (student) => {
      dispatch(actEditStudent(student));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
