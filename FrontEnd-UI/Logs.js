import React, { Component } from "react";
import "./Logs.css";
import { BrowserRouter, Route } from "react-router-dom";
import Monitoring from "./Monitoring.js";
import AddedVM from "./AddedVM.js";
import Signup from "./Signup.js";
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { axiosInstance } from "../common/config";
import NavigationManager from "./NavigationManager";
import NavigationSubManager from "./NavigationSubManager";
// import dashboard from './dashboard.js';
class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Description: "",
      Classification: "",
      Transport_Protocol: "",
      Sender_Address: "",
      Receiver_Address: "",
      status: false,
      logs: null,
      search: ''
    };

    this.onChange = this.onChange.bind(this);

    axiosInstance({
      method: "post",
      url: "/api/users/getlogs",
    })
      .then((response) => {
        this.setState({ logs: response.data.logs });
      })
      .catch((err) => alert(err + "Could not get logs"));
  }

  onChange = (e) => {
    this.setState({ search: e.target.value })
  }

  renderLogs() {
    if(this.state.logs) {
      const { search } = this.state;
      var FilterAttacks = [];
      var searchFilter = search.toLowerCase()
      FilterAttacks = this.state.logs.filter(logs => {
        return Object.keys(logs).some(key =>
          logs[key].toLowerCase().includes(searchFilter)
        );
      })

      return FilterAttacks.map((logs, index) => {
        const { _id, Description, Classification, Transport_Protocol, Sender_Address, 
          Receiver_Address, date, Date, Time} = logs
    
    return (
      <tr key={_id}>
        <td>{Description}</td>
        <td>{Classification}</td>
        <td>{Transport_Protocol}</td>
        <td>{Sender_Address}</td>
        <td>{Receiver_Address}</td>
        <td>
        {Date} {Time.split('.')[0]}
          {/* {moment(new Date(date)).format(
            "DD/MM/YYYY , hh:mm:ss:A"
          )} */}
        </td>
      </tr>
        )
      })
  }
}
  //   this.state.logs
  //                     ? this.state.logs.map((fields) => {
  //                         return (
  //                           <tr>
  //                             <td>{fields.Description}</td>
  //                             <td>{fields.Classification}</td>
  //                             <td>{fields.Priority}</td>
  //                             <td>{fields.Transport_Protocol}</td>
  //                             <td>{fields.Sender_Address}</td>
  //                             <td>{fields.Receiver_Address}</td>
  //                             <td>
  //                               {moment(new Date(fields.date)).format(
  //                                 "DD/MM/YYYY , hh:mm:ss:A"
  //                               )}
  //                             </td>
  //                           </tr>
  //                         );
  //                       })
  //                     : null
  // }

  render() {
    return (
      <BrowserRouter>
        <Route path="/navigation" component={Navigation} />
        <div className="app">
          {this.props.role === "admin" ? (
            <Navigation />
          ) : this.props.role === "manager" ? (
            <NavigationManager />
          ) : this.props.role === "submanager" ? (
            <NavigationSubManager />
          ) : null}
          {/* <!-- Navbar goes here --> */}

          <div className="row">
            <div
              className="col s12 m8 l9 offset-l2 main"
              style={{ marginLeft: "18%", marginRight: "1%" }}
            >
              {/* <!-- Note that "m8 l9" was added --> */}
              {/* <!-- Teal page content */}
              <div className="row">
                <div className="col s12 m7 l8">
                  <h2 className="black-text"> Logs Detail</h2>
                </div>
                <div className="col s12 m3 l1 offset-l3 offset-m2">
                <i className="fab fa-search"></i>
                  <input
                    className="right"
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={this.state.search}
                    onChange={(e) => this.onChange(e)}
                  />
                </div>
              </div>

              <div className="row">
                <table className="striped highlight responsive-table centered">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Classification</th>
                      <th>Transportlayerprotocol</th>
                      <th>IncomingIP</th>
                      <th>OutgoingIP</th>
                      <th>Date & Time </th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.renderLogs()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

Logs.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  role: state.auth.role,
});

export default connect(mapStateToProps)(Logs);
