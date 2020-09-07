import React, { useEffect } from 'react';

import Aux from "../../hoc/_Aux";
import { Link } from 'react-router-dom';

function Logout(props) {
  
  useEffect(() => {
    props.setLoggedIn(false)
    sessionStorage.clear()
  }, [])

  return (
    <Aux>
    <div className="auth-wrapper">
      <div className="auth-content">
          <div className="auth-bg">
              <span className="r"/>
              <span className="r s"/>
              <span className="r s"/>
              <span className="r"/>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                  <i className="feather icon-unlock auth-icon"/>
              </div>
              <h5 className="mb-4">You have logged out successfully!</h5>
              <Link to="/login" >
                <button className="btn btn-primary shadow-2 mb-4">Login</button>
              </Link>
            </div>
          </div>
      </div>
  </div>
  </Aux>
  )
}

export default Logout;
