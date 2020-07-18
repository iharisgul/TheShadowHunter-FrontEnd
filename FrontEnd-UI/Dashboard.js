import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import LineChart from './LineChart';
import BarChart from './BarChart';
import './dashboard.css';
// import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
import HorizontalBar from './HorizontalBar';

import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navigation from './Navigation'
import NavigationManager from './NavigationManager'
import NavigationSubManager from './NavigationSubManager'
import Radarchart from './RadarChart';
import { logsDoughnutGraph, alertsBarGraph, vmHorizontalGraph } from "../actions/visualizationAction";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.props.logsDoughnutGraph();
    this.props.alertsBarGraph();
    this.props.vmHorizontalGraph();
  }
  render() {
    return (
      <BrowserRouter>
        <Route path='/navigation' component={Navigation} />
        <div className='app'>
        {this.props.role === "admin" ? <Navigation/>:(this.props.role === "manager" ? <NavigationManager/>:(this.props.role === "submanager"?<NavigationSubManager/>:null ) )}
          {/* <!-- Navbar goes here --> */}
          <div className='row'>

            <div className='col s12 m8 l9 offset-l2 main' style={{marginLeft:'18%', marginRight:"1%"}}>
              {/* <!-- Note that "m8 l9" was added --> */}
              {/* <!-- Teal page content */}
              <div className='row'>
                <div className='col s12 m6 l3'>
                  <div className='card text-white bg-primary o-hidden h-100'>
                    <div className='card-body'>
                      <div className='card-body-icon'>
                        <i className='fas fa-fw fa-list' />
                      </div>
                      <div className='mr-5'>Scan Result!</div>
                    </div>
                    <a
                      className='card-footer text-white clearfix small z-1'
                      href={this.props.role === "admin" ?'/viewscan':(this.props.role  === "manager" ? '/managerviewscan':null ) }
                    >
                      <span className='float-left'>View Details</span>
                      <span className='float-right'>
                        <i className='fas fa-angle-right' />
                      </span>
                    </a>
                  </div>
                </div>
                <div className='col s12 m6 l3 '>
                  <div className='card text-white bg-warning o-hidden h-100'>
                    <div className='card-body'>
                      <div className='card-body-icon'>
                        <i className='fas fa-fw fa-list' />
                      </div>
                      <div className='mr-5'>Logs!</div>
                    </div>
                    <a
                      className='card-footer text-white clearfix small z-1'
                      href={this.props.role === "admin" ?'/logs':(this.props.role  === "manager" ? '/managerlogs' :this.props.role  === "submanager" ? '/submanagerlogs':null) }
                    >

                  


                      <span className='float-left'>View Details</span>
                      <span className='float-right'>
                        <i className='fas fa-angle-right' />
                      </span>
                    </a>
                  </div>
                </div>
                <div className='col s12 m6 l3 '>
                  <div className='card text-white bg-success o-hidden h-100'>
                    <div className='card-body'>
                      <div className='card-body-icon'>
                        <i className='fas fa-fw fa-shopping-cart' />
                      </div>
                      <div className='mr-5'>Alerts!</div>
                    </div>
                    <a
                      className='card-footer text-white clearfix small z-1'
                      href={this.props.role === "admin" ?'/newalerts':(this.props.role  === "manager" ? '/managernewalerts' :this.props.role  === "submanager" ? '/submanagernewalerts':null) }
                    >

                      <span className='float-left'>View Details</span>
                      <span className='float-right'>
                        <i className='fas fa-angle-right' />
                      </span>
                    </a>
                  </div>
                </div>
               
              </div>

              <div className='row'>
                <div className='col s12 m12 l12 '>
                  <div className='card text-white  o-hidden white h-100'>
                    <div className='card-body'>
                    <h4 className="black-text center">Alerts</h4>
                      <BarChart labels = {this.props.visualization.alertsFound ? Object.keys(this.props.visualization.alerts): null}
                       data ={this.props.visualization.alertsFound ? Object.values(this.props.visualization.alerts): null} />
                    </div>
                  </div>
                </div>
                </div>

             

                <div className='row'>
                <div className='col s12 12 l12 '>
                  <div className='card text-white o-hidden white h-100'>
                    <div className='card-body'>
                       <h4 className="black-text center">VM Services</h4>
                      <HorizontalBar labels = {this.props.visualization.servicesFound ? Object.keys(this.props.visualization.services): null}
                       data ={this.props.visualization.servicesFound ? Object.values(this.props.visualization.services): null}></HorizontalBar>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='row'>
                <div className='col s12 m12 l12 '>
                  <div className='card text-white o-hidden white h-100'>
                    <div className='card-body'>
                    <h4 className="black-text center">Logs</h4>
                      <DoughnutChart labels = {this.props.visualization.logsFound ? Object.keys(this.props.visualization.logs): null}
                       data ={this.props.visualization.logsFound ? Object.values(this.props.visualization.logs): null}/>
                    </div>
                  </div>
                </div>

               
              </div>
{/* <button href="/Addrole"> add </button> */}
             
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  logsDoughnutGraph:  PropTypes.func.isRequired,
  alertsBarGraph: PropTypes.func.isRequired,
  vmHorizontalGraph: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  role: state.auth.role,
  visualization: state.visualization
})

export default connect(mapStateToProps, { logsDoughnutGraph, alertsBarGraph, vmHorizontalGraph})(Dashboard)
