import {Route, Link, useRouteMatch, NavLink} from "react-router-dom";
import Address from './Address';
import Summary from './Summary';
import Order from './Order';
import Payment from './Payment';
import { connect } from 'react-redux';
function Checkout(props){
    if(!props.user){
        props.history.push("/")
    }

    var route = useRouteMatch()
    var url = route.url
    var path = route.path
    
    var handleClick = (e) => {
        e.preventDefault()
    }

    console.log('---',route,url,path,props)
    
    return(
        <div className="container mt-4">
            <div className="row">
            <div className="col-md-8 col-sm-12 col-xs-12">
            <div className="row">
            <div className="col-4 col-md-4 col-sm-3 col-xs-3">
            <ul className="nav flex-column">
                <li className="nav-item mt-3 mb-3">
                    <NavLink exact activeClassName="active" to={url}>
                        Summary
                    </NavLink>
                </li>
                <li className="nav-item mt-3 mb-3">
                    <NavLink  onClick={props.step >= 2 ? '' : handleClick } activeClassName="active" to={url+"/address"}>
                        Address
                    </NavLink>
                </li>
                <li className="nav-item mt-3 mb-3">
                    <NavLink  onClick={props.step >= 3 ? '' : handleClick } activeClassName="active" to={url+"/payment"}>
                        Payment
                    </NavLink>
                </li>
                <li className="nav-item mt-3 mb-3">
                    <NavLink onClick={props.step >= 4 ? '' : handleClick } activeClassName="active" to={url+"/order"}>
                        Order
                    </NavLink>
                </li>
            </ul>
            </div>
            <div className="col-8 col-md-8 col-sm-9 col-xs-9">
                <Route path={path} exact component={Summary} />
                <Route path={path+"/address"} component={Address} />
                <Route path={path+"/payment"} component={Payment} />
                <Route path={path+"/order"} component={Order} />
            </div>
        </div>
        </div>
        <div className="col-12 col-md-4 col-sm-12 col-xs-12">
            <Link to="/cart">
            <button className="btn btn-info mb-3" style={{float:"right"}}>Update Cart</button>
            </Link>
            <table className="table borderless card">
            <h2 className="text-center"> Cart Items </h2>
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
                        <td>$ {each.price}</td>
                        </tr>)
            })}
            </table>
            <table className="table borderless card">
                <tr>
                <td >&nbsp;</td>
                <td className="text-left">Total</td>
                <td >&nbsp;</td>
                <td >&nbsp;</td>
                <td >&nbsp;</td>
                <td >&nbsp;</td>
                <td >&nbsp;</td>
                <td className="text-right">$ {props.cartTotal}</td>
                </tr>
            </table>
        </div>
        </div>
        </div>
    )
}

export default connect(function(state,props){
    return {
        step : state && state?.checkoutstep, 
        user : state && state?.user,
        cartdetails:state && state?.cartdetails,
        cartTotal:state && state?.carttotal,
    }
})(Checkout)