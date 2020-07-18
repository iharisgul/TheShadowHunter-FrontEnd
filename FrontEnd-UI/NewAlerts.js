import React, { Component } from 'react';
import './Logs.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Monitoring from './Monitoring.js';
import AddedVM from './AddedVM.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard';
import Navigation from './Navigation'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import moment from "moment";
import {axiosInstance} from '../common/config';
import NavigationManager from './NavigationManager'
import NavigationSubManager from './NavigationSubManager'
// import dashboard from './dashboard.js';
class NewAlerts extends Component{

  constructor(props) {
      super(props);
  
      this.state = {
      
       
        incoming_ip:"",
        status:false,
        logs: null
      }
     
      
    
  
    
    axiosInstance({
      method: 'post',
      url: '/api/users/getnewalerts'
      
  })
      .then(response => {
            this.setState({alerts: response.data.alerts})
              
      })
      .catch(err => alert(err + 'Could not get alerts'));

     
      
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
      <h2 className="center black-text" > Alert Details</h2>
      <div className='row'>
       
        <table 
          className='striped highlight responsive-table centered'
        >
          <thead>
            <tr>
            
            
              <th>Incoming Ip</th>
              <th>Date & Time </th>
            </tr>
          </thead>

          <tbody>
{
    this.state.alerts ? this.state.alerts.map((fields)=>
    {
        return(

            <tr>
           
            <td>{fields.incoming_ip}</td>
            <td>       {fields.Date} {fields.Time.split('.')[0]}
              {/* {moment (new Date(fields.date)).format('DD/MM/YYYY , hh:mm:ss:A')} */}
              </td>
          </tr>
        )
    }
    ) : null
}

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

NewAlerts.propTypes = {
isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
isAuthenticated: state.auth.isAuthenticated,
token: state.auth.token,
role: state.auth.role
})

export default connect(mapStateToProps)(NewAlerts)