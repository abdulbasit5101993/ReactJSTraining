import { Link } from "react-router-dom";
import {useState} from 'react';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch  } from '@fortawesome/free-solid-svg-icons'


function Navbar(props){
  var [searchtext, setSearchtext]=useState('')
  let getSearchText=(event)=>{
      setSearchtext(event.target.value)
  }
  var logout = (event)=>{
    event.preventDefault()
    props.dispatch({
      type:"LOGOUT",
    })
  }

  return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
          <Link to="/"><span className="navbar-brand">My CakeShop </span></Link>
      
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              {props.user && 
              <li className="nav-item">
                  <a className="nav-link text-danger" href="#"  aria-disabled="true">
                    <span className="badge badge-success">
                    Welcome - {props.user}
                    </span>
                  </a>
              </li>
              }
              </ul>
              
              <form className="form-inline my-2 my-lg-0">
              <input onChange={getSearchText} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <Link to={"/search?cake="+searchtext}>
                <button className="btn btn-outline-success my-2 my-sm-0 mr-2" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              </Link>
              {props.user ? 
              <Link to="/orderdetails"><button className="btn btn-outline-success mr-2">Orders</button></Link>
              :
              ""
            }
              {props.quantity ? 
              <Link to={"/cart"}>
              <button className="btn btn-outline-warning my-2 my-sm-0 mr-2" type="submit">
              Cart
                ({props.quantity.length})
              </button>
              </Link>
              :
              ""
              }
              {props.loginstatus ?<button className="btn btn-danger"  onClick={logout}>Logout</button>:
              <Link to="/login"><button className="btn btn-primary" >Login</button></Link>}
              
              </form>
          </div>
          </nav>
  )
}

export default connect(function(state,props){
  console.log('from nav state',state,props)
  return {
    // token: state?state["user"]["token"],
    token: state && state?.user?.token,
    user: state && state?.user?.name,
    loginstatus: state?.isloggedin,
    quantity: state && state?.cartdetails,
    iscartdata: state?.iscartdata,
  }
})(Navbar);