import React, { Component } from "react";
import { connect } from "react-redux";
import { actGetKeyword } from "../store/action";

class Search extends Component {
  render() {
    return (
      <div>
        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i class="fa fa-search"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm tên sinh viên"
            onChange={(e) => {
              this.props.getKeyword(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKeyword: (keyword) => {
      dispatch(actGetKeyword(keyword));
    },
  };
};

export default connect(null, mapDispatchToProps)(Search);
