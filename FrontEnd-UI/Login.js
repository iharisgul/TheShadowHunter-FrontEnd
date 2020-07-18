import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from '../actions/adminAuthAction'
import Alert from '../layout/Alert'
import Dashboard from './Dashboard'
import internetSecurity from './internetSecurity.jpg'
import "./Login.css";

import Particles from 'react-particles-js'

const Login = ({ login, isAuthenticated, token, role}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {  email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()

    login({ email, password });
  };

  //Redirect if logged  in 
  if (token && isAuthenticated && role === "admin") {
    return <Redirect to='/admindashboard' />
  }

  return (
    <BrowserRouter>
      <Route path="/dasboard" component={Dashboard} />
      {/* <Route path="/signup" component={Signup} /> */}
      <div className="page stylelogin">

      <div className="container-fluid" >
      <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 80,
	            "density": {
	                "enable": true,
	                "value_area": 500
	            }
	        },
	        "line_linked": {
	            "enable": true,
	            "opacity": 0.05
	        },
	        "move": {
	            "direction": "right",
	            "speed": 0.05
	        },
	        "size": {
	            "value": 1
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "speed": 1,
	                "opacity_min": 0.05
	            }
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onclick": {
	                "enable": true,
	                "mode": "push"
	            }
	        },
	        "modes": {
	            "push": {
	                "particles_nb": 1
	            }
	        }
	    },
	    "retina_detect": true
	}} />
        <center>
        
          <div className="signin center" style={{ zIndex: 2, position: 'relative', opacity: '0.7px',  alignItems: 'center'}}>
            <div className="card animate fadeLeft " style={{ width:'30%', margin:'auto', border:'3px solid #07575B'}}>
              <div className="card-content white-text " style={{padding:'10%'}} >
                <form onSubmit={e => onSubmit(e)}>
                <h2 className="center white-text" style={{letterSpacing: '1px', fontStyle: 'italic'}}>Shadow Hunters</h2>
          {/* <h4 className="center white-text"  style={{letterSpacing: '2.5px', fontWeight: 700}}>Admin Panel</h4> */}
                  <h1 className="h3 mb-3 font-weight-normal white-text" style={{  opacity: '1' }}>Sign In as Admin</h1>
                  <Alert />
                  <br />
                  <div className="form-group" style={{  opacity: '1' }}>
                    <input
                      type="email"
                      className="form-control white-text "
                      name="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={e => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{  opacity: '1' }}>
                    <input
                      type="password"
                      className="form-control white-text "
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                  </div>
                  <center>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block center"
                    style={{  opacity: '1' , width:"30%"}}
                  >
                    Login
                  </button>
                  </center>
                  <br></br>
                  <p>Go to Manager Panel  <a href="/managerlogin"> Click Here</a></p>
                  <br></br>
                  <p>Go to Sub Manager Panel  <a href="/submanagerlogin"> Click Here</a></p>
                </form>
               
              </div>
              
            </div>
          </div>


          
        </center>
        </div>

      </div>



    </BrowserRouter>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  role: state.auth.role
})

export default connect(mapStateToProps, { login })(Login)
