import axios from "axios"
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
function Cart(props){
  if(!props.user){
    props.history.push("/")
  }
    return(
        <div className="row">
          <div className="col-md-6 offset-md-1 col-sm-12 col-xs-12 mt-5">
          <h2 className="text-center">Checkout to Cart</h2>
          <div className="card">
            <div className="card-header">
              <Link to="/">
                <button className="btn btn-success" style={{float:"right"}}>
                  Add More
                </button>
              </Link>
            </div>
              <table className="table borderless">
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                {props.cartdetails?.length >0 && props.cartdetails.map((each,index)=> {
                  return (<tr>
                            <td>
                            <Link to={'/cake/'+each.cakeid}>
                              {each.name}
                            </Link>
                              </td>
                            <td>
                              <img src={each.image} style={{width:"80px"}}></img>
                            </td>
                            <td>{each.price}</td>
                            <td><Link to={'/removeitem/'+each.cakeid}><button className="btn btn-danger"> <FontAwesomeIcon icon={faTrash} /></button></Link></td>
                          </tr>)
                })}
                </table>
          </div>  
          </div>  
          <div className="col-md-3 offset-md-1 col-xs-12 col-sm-12 mt-5">
          <h2 className="text-center">Summary</h2>
          <div className="card pt-5 pb-5">
            <strong className="mt-2 mb-2">Cart Total : {props?.cartTotal}</strong>
          <Link to="/checkout">
            <button className="btn btn-info">
                Checkout
            </button>
          </Link>
          </div>
          </div>
        </div>
    )
}

export default connect(function(state,props){
  return {
    cartdetails:state && state?.cartdetails,
    user:state && state?.user,
    cartTotal:state && state?.carttotal,
  }
})(Cart);