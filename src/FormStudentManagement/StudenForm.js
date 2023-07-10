import React, { Component } from "react";
import { connect } from "react-redux";
import { actAddStudent } from "../store/action";
import { actEditStudent } from "../store/action";
import { actUpdateStudent } from "../store/action";

class StudentFrom extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      phone: "",
      email: "",
    },

    errors: {
      maSV: "",
      hoTen: "",
      phone: "",
      email: "",
    },

    valMaSV: false,
    valHoTen: false,
    valPhone: false,
    valEmail: false,
    valForm: false,

    isDisabledMaSV: false,
  };

  handleOnchange = (e) => {
    const { name, value } = e.target;

    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.studentEdit) {
      if (window.confirm("Bạn có chắc muốn cập nhật sinh viên này?")) {
        this.props.updateStudent(this.state.values);
      }
    } else {
      if (window.confirm("Bạn có chắc muốn thêm sinh viên này?")) {
        this.props.addStudent(this.state.values);
      }
    }
  };

  handleOnBlur = (e) => {
    const { name, value } = e.target;

    let mess = value.trim() ? "" : `${name} không được bỏ trống!`;

    let { valMaSV, valHoTen, valPhone, valEmail } = this.state;

    switch (name) {
      case "maSV":
        valMaSV = mess === "" ? true : false;
        if (value && value.trim().length > 4) {
          mess = "Mã SV từ 4 ký tự trở xuống";
          valMaSV = false;
        }
        break;

      case "hoTen":
        valHoTen = mess === "" ? true : false;
        if (value && !value.match(/^[\p{L}\s'-]+$/u)) {
          mess = "Họ tên phải là chữ";
          valHoTen = false;
        }
        break;

      case "phone":
        valPhone = mess === "" ? true : false;
        if (value && !value.match(/^\d{10}$/)) {
          mess = "Phone phải có 10 chữ số";
          valPhone = false;
        }
        break;

      case "email":
        valEmail = mess === "" ? true : false;
        if (
          value &&
          !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          mess = "Email không đúng định dạng!";
          valEmail = false;
        }
        break;

      default:
        break;
    }

    this.setState({
      errors: { ...this.state.errors, [name]: mess },
      valMaSV,
      valHoTen,
      valPhone,
      valEmail,
      valForm: valMaSV && valHoTen && valPhone && valEmail,
    });
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps && nextProps.studentEdit) {
      this.setState({
        values: {
          maSV: nextProps.studentEdit.maSV,
          hoTen: nextProps.studentEdit.hoTen,
          phone: nextProps.studentEdit.phone,
          email: nextProps.studentEdit.email,
        },

        valMaSV: true,
        valHoTen: true,
        valPhone: true,
        valEmail: true,
        valForm: true,

        isDisabledMaSV: true,
      });
    } else {
      this.setState({
        values: {
          maSV: "",
          hoTen: "",
          phone: "",
          email: "",
        },

        valMaSV: false,
        valHoTen: false,
        valPhone: false,
        valEmail: false,
        valForm: false,

        isDisabledMaSV: false,
      });
    }
  };

  renderButton = () => {
    if (this.props.studentEdit) {
      return (
        <>
          <button
            type="submit"
            className="btn btn-warning"
            disabled={!this.state.valForm}
          >
            Cập nhật sinh viên
          </button>
          <button
            className="btn btn-danger ml-3"
            onClick={() => {
              this.props.closeEdit();
            }}
          >
            Hủy cập nhật
          </button>
        </>
      );
    } else {
      return (
        <button
          type="submit"
          className="btn btn-success"
          disabled={!this.state.valForm}
        >
          Thêm sinh viên
        </button>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="card">
          <div
            className="card-header bg-dark text-white font-weight-bold"
            style={{ fontSize: "20px" }}
          >
            Thông tin sinh viên
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Mã SV</label>
                    <input
                      type="text"
                      value={this.state.values.maSV}
                      className="form-control"
                      name="maSV"
                      disabled={this.state.isDisabledMaSV}
                      onChange={this.handleOnchange}
                      onBlur={this.handleOnBlur}
                    />
                    {this.state.errors.maSV && (
                      <div className="text-danger">
                        {this.state.errors.maSV}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Họ tên</label>
                    <input
                      type="text"
                      value={this.state.values.hoTen}
                      className="form-control"
                      name="hoTen"
                      onChange={this.handleOnchange}
                      onBlur={this.handleOnBlur}
                    />
                    {this.state.errors.hoTen && (
                      <div className="text-danger">
                        {this.state.errors.hoTen}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      value={this.state.values.phone}
                      className="form-control"
                      name="phone"
                      onChange={this.handleOnchange}
                      onBlur={this.handleOnBlur}
                    />
                    {this.state.errors.phone && (
                      <div className="text-danger">
                        {this.state.errors.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={this.state.values.email}
                      className="form-control"
                      name="email"
                      onChange={this.handleOnchange}
                      onBlur={this.handleOnBlur}
                    />
                    {this.state.errors.email && (
                      <div className="text-danger">
                        {this.state.errors.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {this.renderButton()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentEdit: state.qlsvReducer.studentEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => {
      dispatch(actAddStudent(student));
    },

    closeEdit: () => {
      dispatch(actEditStudent(null));
    },

    updateStudent: (student) => {
      dispatch(actUpdateStudent(student));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentFrom);
