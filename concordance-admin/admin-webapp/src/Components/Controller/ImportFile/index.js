import React, { Component } from "react";
import { connect } from "react-redux";
import { createAciton } from "../../../Redux/Action";
import axios from "axios";
import { UPLOAD_DATA_LANGUAGE } from "../../../Redux/Action/type";
class ImportFile extends Component {
  state = {
    selectedFile: null,
    selectedLanguage: null,
  };

  //Handle form, state will be updated by any form changes
  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Handle file changes
  onFileChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };
  // Push data to Backend
  fileUploadHandler = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("filename", this.state.selectedFile);
    axios
      .post(
        `http://127.0.0.1:8000/api/${this.state.selectedLanguage}/upload/`,
        fd,
        {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress:",
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          },
        }
      )
      .then((res) => {
        this.props.dispatch(
          createAciton(UPLOAD_DATA_LANGUAGE, this.state.selectedLanguage)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let buttonSubmit = null;
    if (!this.state.selectedLanguage || !this.state.selectedFile) {
      buttonSubmit = (
        <button className="btn disabledButton" type="submit" disabled>
          UPLOAD
        </button>
      );
    } else {
      buttonSubmit = (
        <button className="btn importFile__btnSummit" type="submit">
          UPLOAD
        </button>
      );
    }

    return (
      <div className="col-4 importFile">
        <div className="controller__item d-flex">
          <i className="fa fa-file-import mr-4 import-icon"></i>
          <form
            className="d-flex justify-content-around align-items-start"
            onSubmit={this.fileUploadHandler}
          >
            <div>
              <div className="custom-file mb-2">
                <input
                  type="file"
                  className="custom-file-input"
                  onChange={this.onFileChangeHandler}
                  name="selectedFile"
                />
                <label className="custom-file-label">
                  {this.state.selectedFile == null
                    ? "Choosen file"
                    : this.state.selectedFile.name}
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineCheckbox1"
                  value="endata"
                  name="selectedLanguage"
                  onChange={this.onChangeHandler}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  English
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineCheckbox1"
                  value="vidata"
                  name="selectedLanguage"
                  onChange={this.onChangeHandler}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  Vietnamese
                </label>
              </div>
            </div>

            {/* Button submit */}
            {buttonSubmit}
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(ImportFile);
