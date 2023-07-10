import React, { Component } from "react";
import StudentForm from "./StudenForm";
import StudentList from "./StudentList";
import Search from "./Search";

export default class FormManagement extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <StudentForm />
          <Search />
          <StudentList />
        </div>
      </div>
    );
  }
}
