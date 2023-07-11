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

  // thay đổi value trong state khi nhập vào input
  handleOnchange = (e) => {
    const { name, value } = e.target;

    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // nếu props studentEdit khác null thì cập nhật, ngược lại thì thêm
    if (this.props.studentEdit) {
      if (window.confirm("Bạn có chắc muốn cập nhật sinh viên này?")) {
        this.props.updateStudent(this.state.values);
      }
    } else {
      if (window.confirm("Bạn có chắc muốn thêm sinh viên này?")) {
        this.props.addStudent(this.state.values);
        this.setState({
          values: {
            maSV: "",
            hoTen: "",
            phone: "",
            email: "",
          },
        });
      }
    }
  };

  handleOnBlur = (e) => {
    // validation các input
    const { name, value } = e.target;

    // check rỗng
    let mess = value.trim() ? "" : `${name} không được bỏ trống!`;

    let { valMaSV, valHoTen, valPhone, valEmail } = this.state;

    switch (name) {
      case "maSV":
        valMaSV = mess === "" ? true : false;

        // check số ký tự mã SV
        if (value && value.trim().length > 4) {
          mess = "Mã SV từ 4 ký tự trở xuống";
          valMaSV = false;
        }
        break;

      case "hoTen":
        valHoTen = mess === "" ? true : false;

        // check tên
        if (value && !value.match(/^[\p{L}\s'-]+$/u)) {
          mess = "Họ tên phải là chữ";
          valHoTen = false;
        }
        break;

      case "phone":
        valPhone = mess === "" ? true : false;

        // check số ký tự số điện thoại
        if (value && !value.match(/^\d{10}$/)) {
          mess = "Phone phải có 10 chữ số";
          valPhone = false;
        }
        break;

      case "email":
        valEmail = mess === "" ? true : false;

        // check định dạng email
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

    // cập nhật state
    this.setState({
      errors: { ...this.state.errors, [name]: mess },
      valMaSV,
      valHoTen,
      valPhone,
      valEmail,
      valForm: valMaSV && valHoTen && valPhone && valEmail,
    });
  };

  // khi nhận props thì thực hiện
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    // props studentEdit có giá trị thì cập nhật state để hiện thị ra form
    if (nextProps && nextProps.studentEdit) {
      this.setState({
        values: {
          maSV: nextProps.studentEdit.maSV,
          hoTen: nextProps.studentEdit.hoTen,
          phone: nextProps.studentEdit.phone,
          email: nextProps.studentEdit.email,
        },

        // khi cập nhật thì mặc định các valid sẽ true hết, khi người dùng chỉnh sửa sẽ validate lại
        valMaSV: true,
        valHoTen: true,
        valPhone: true,
        valEmail: true,
        valForm: true,

        // disabled input nhập mã SV khi cập nhật
        isDisabledMaSV: true,
      });
    } else {
      // nếu props studentEdit rỗng thì cập nhật lại state
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

  // render các button "Thêm, cập nhật, hủy"
  renderButton = () => {
    // nếu props studentEdit có giá trị thì render 2 button "Cập nhật" và "Hủy cập nhật"
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
      // nếu không thì render button "Thêm"
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
