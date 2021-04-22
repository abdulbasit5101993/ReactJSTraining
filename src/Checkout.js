import {Route, Link, useRouteMatch} from "react-router-dom";
import Address from './Components/Checkout/Address';
import Summary from './Components/Checkout/Summary';
import Order from './Components/Checkout/Order';
import Payment from './Components/Checkout/Payment';
import { connect } from 'react-redux';
function Checkout(props){
    if(!props.user){
        props.history.push("/")
        }
    var route = useRouteMatch()
    var url = route.url
    var path = route.path
    
    console.log('---',route,url,path,props)
    
    return(
        <div className="row mt-4">
            <div className="col-4 card">
                <Link to={url} >
                    <li>Cart Summary</li>
                </Link>
                <Link to={url+"/address"}>
                    <li>Cart Address</li>
                </Link>
                {/* { props.step >= 1 ? 'address' : '' }
                { props.step >= 2 ? 'payment' : '' }
                { props.step >= 3 ? 'order' : '' } */}
                <Link to={url+"/payment"}>
                    <li>Cart Payment</li>
                </Link>
                <Link to={url+"/order"} onClick={ (props.step > 3) ? ((event) => event.preventDefault())  : ''} >
                    <li>Cart Order</li>
                </Link>
            </div>
            <div className="col-8 card">
                <Route path={path} component={Summary} />
                <Route path={path+"/address"} component={Address} />
                <Route path={path+"/payment"} component={Payment} />
                <Route path={path+"/order"} component={Order} />
            </div>
        </div>
    )
}

export default connect(function(state,props){
    return {
        step : state && state?.checkoutstep, 
        user : state && state?.user
    }
})(Checkout)