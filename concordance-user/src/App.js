import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from "./Screens/Search";
import Header from "./Layouts/Header";
import Help from "./Screens/Help";
import Aboutus from "./Screens/Aboutus";
import Statistics from "./Screens/Statistics";
import Home from "./Screens/Home";
import { connect } from "react-redux";
import { createAction } from "./Redux/Action";
import { FETCH_VI_DATA, FETCH_EN_DATA, NEXT_PAGE } from "./Redux/Action/type";
import { dataService } from "./Services";
import Footer from "./Layouts/Footer";
import Spinner from "./Components/Spinner";

class App extends Component {
  componentDidMount() {
    // FETCH Vietnamese sentences

    dataService
      .fetchData_pagination(this.props.pageNumber, "vnsentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_VI_DATA, response.data.results));
        this.props.dispatch(createAction(NEXT_PAGE, response.data.next));
      })
      .catch((error) => {
        this.props.dispatch(createAction("RESET_LOADING", false));
        alert(error.message);
      });
    // FETCH English sentences
    dataService
      .fetchData_pagination(this.props.pageNumber, "ensentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_EN_DATA, response.data.results));
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  render() {
    return (
      <BrowserRouter className="wrapper">
        <Header />
        <Switch>
          <Route path="/statistics" component={Statistics} />
          <Route path="/aboutus" component={Aboutus} />
          <Route path="/help" component={Help} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
        {this.props.loaded === true ? <Spinner /> : null}
        <Footer />
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pageNumber: state.Controller.currentPage,
    loaded: state.Controller.loaded,
  };
};
export default connect(mapStateToProps)(App);
