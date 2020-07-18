import React, { Component } from "react";
import "./Monitoring.css";
import { BrowserRouter, Route } from "react-router-dom";
import Monitoring from "./Monitoring.js";

import Signup from "./Signup.js";
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import NavigationManager from "./NavigationManager";
import NavigationSubManager from "./NavigationSubManager";
import { axiosInstance } from "../common/config";

class Monitorings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      managers: null,
      submanagers: null,
      departments: null,
      services: null,
    };
    //for department
    this.getDepartments();
    this.deleteDepartments = this.deleteDepartments.bind(this);
    this.deld = this.deld.bind(this);

    //for services
    this.getServices();
    this.deleteServices = this.deleteServices.bind(this);
    this.dels = this.dels.bind(this);
  }

  // for departments
  getDepartments() {
    axiosInstance({
      method: "post",
      url: "/api/users/getdepartment",
    })
      .then((response) => {
        this.setState({ departments: response.data.departments });
      })
      .catch((err) => alert(err + "Could not get departments"));
  }

  //for services
  getServices() {
    axiosInstance({
      method: "post",
      url: "/api/users/getservices",
    })
      .then((response) => {
        this.setState({ services: response.data.services });
      })
      .catch((err) => alert(err + "Could not get services"));
  }

  //for department
  deleteDepartments = async (_id) => {
    await axiosInstance({
      method: "post",
      url: "/api/users/deleteDepartments",
      data: { _id: _id },
    })
      .then((e) => {
        console.log("Department has been permanantly deleted", "success");
        console.log(_id)
      })
      .catch((err) => alert(err + "Could not delete Department"));
  };

  deld(e) {
    e.preventDefault();
    this.deleteDepartments(e.currentTarget.value);
    console.log(e.currentTarget.value)
    this.getDepartments();
    window.location.reload(true);
  }

  //for services

  deleteServices = async (_id) => {
    await axiosInstance({
      method: "post",
      url: "/api/users/deleteServices",
      data: { _id: _id },
    })
      .then((e) => {
        console.log("VM has been permanantly deleted", "success");
      })
      .catch((err) => alert(err + "Could not delete VM"));
  };

  dels(e) {
    e.preventDefault();
    this.deleteServices(e.currentTarget.value);
    this.getServices();
    window.location.reload(true);
  }

  rowDiv(i) {
    if (i % 4 === 0) {
      return (
        <div className="row">
          <div className="col s12 m12 l12"></div>
        </div>
      );
    } else {
      return null;
    }
  }

  //    deleteService(e){
  //     console.log(e.target.value)

  //     axiosInstance(
  //       {
  //       method: "post",
  //       url:"http://192.168.1.110:8080/execute-VM",
  //       data: {"ip_address":(e.target.value)}
  //     }
  //     ).then(res=>{
  //       console.log(res.e.target.value);
  //       //  updateStatus(res.data);

  //     }).catch(err=>{console.log(err)})
  //     console.log(JSON.stringify(e.target.value))

  //   }

  // deleteService(e){
  // console.log(e.target.value)

  // axiosInstance(
  //   {
  //   method: "post",
  //   url:"http://192.168.1.110:8080/execute-VM",
  //   data: {"ip_address":(e.target.value)}
  // }
  // ).then(res=>{
  //   console.log(res.e.target.value);
  //   //  updateStatus(res.data);

  // }).catch(err=>{console.log(err)})
  // console.log(JSON.stringify(e.target.value))

  // }

  render() {
    let cards = [];
    let elements = [];
    let vmcards = [];
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

              {/* <div className="row" > */}
              {this.state.departments
                ? this.state.departments.map((fields, i) => {
                    const { IPaddress, account, password, date, _id } = fields;
                    elements.push(
                      <div key={IPaddress} className="col s12 m4 l4">
                        <div className="card text-black o-hidden white h-100">
                          <i class="large material-icons center">
                            desktop_windows
                          </i>
                          <div className="card-body">
                            <h2 className="center">Department</h2>
                            <hr></hr>
                            <h4>IP Address: {IPaddress}</h4>
                            <hr></hr>
                            <h6>Account used: {account}</h6>
                            <hr></hr>
                            <h6>Account password: {password}</h6>
                            <hr></hr>
                            <h6>
                              {moment(new Date(date)).format(
                                "DD/MM/YYYY , hh:mm:ss:A"
                              )}
                            </h6>
                            <hr></hr>
                            <button
                              class="btn btn-danger"
                              value={_id}
                              onClick={(e) => this.deld(e)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );

                    if ((i + 1) % 3 === 0) {
                      cards.push(<div className="row">{elements}</div>);
                      elements = [];
                    }
                    if (i + 1 === this.state.departments.length) {
                      if (elements.length > 0) {
                        console.log(elements);
                        cards.push(<div className="row">{elements}</div>);
                        elements = [];
                      }
                    }
                  })
                : null}
              {/* dalta pori ba copy ke */}

              {this.state.services
                ? this.state.services.map((fields, i) => {
                  const { IPaddress, account, password, service, date, _id } = fields;
                    elements.push(
                      <div key={fields.IPaddress} className="col s12 m4 l4">
                        <hr></hr>
                        <div className="card text-black o-hidden white h-100">
                          <i class="large material-icons center">desktop_mac</i>
                          <div className="card-body">
                            <h2 className="center">VM</h2>
                            <hr></hr>
                            <h4>IP Address: {IPaddress}</h4>

                            <hr></hr>
                            <h6>Account used: {account}</h6>
                            <hr></hr>
                            <h6>Account password: {password}</h6>
                            <hr></hr>
                            <h6>VM up: {service}</h6>
                            <hr></hr>
                            <h6>
                              {moment(new Date(date)).format(
                                "DD/MM/YYYY , hh:mm:ss:A"
                              )}
                            </h6>
                            <hr></hr>
                            {/* <div className="led-box" style={{marginLeft:'37%'}}>
                        <div className="led-green" > </div>
    
                                
                                
                        <div className="led-green" > </div>
    
                                
                              
                        <div className="led-green" > </div>
    
                        </div>
                                 <hr></hr> */}
                            <button
                              class="btn btn-danger"
                              value={_id}
                              onClick={(e) => this.dels(e)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );

                    if ((i + 1) % 3 === 0) {
                      vmcards.push(<div className="row">{elements}</div>);
                      elements = [];
                    }
                    if (i + 1 === this.state.services.length) {
                      if (elements.length > 0) {
                        console.log(elements);
                        vmcards.push(<div className="row">{elements}</div>);
                        elements = [];
                      }
                    }
                  })
                : null}

              {cards}
              {vmcards}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

Monitorings.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  role: state.auth.role,
});

export default connect(mapStateToProps)(Monitorings);

//value={JSON.stringify(fields),}  onClick={e=>this.deleteService(e)}
