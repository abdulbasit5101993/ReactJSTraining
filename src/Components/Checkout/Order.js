import { connect } from 'react-redux';
function Order(props){
    let placeOrder=function(){
        console.log('placeorder',props);
        var orderdata = {
            price: props.carttotal, 
            name: props.summaryform.username, 
            address: props.addressform.address, 
            phone: props.summaryform.phone,           
            city: props.addressform.city, 
            pincode: props.addressform.pincode, 
            cakes: props.cartdetails
        }
        console.log('orderdata api',orderdata)

        props.dispatch({
            type : "PLACE_ORDER",
            payload : orderdata
        })
    
        alert("Order placed successfully")
        // props.history.replace("/");
    }
    return(
        <div>
            <h5 className="text-center"> Order </h5>
            <div className="text-success">
            <button onClick={placeOrder} className="btn btn-outline-primary">
            Place Order
            </button>
            </div>
        </div>
    )
}

export default connect(function(state,props){
    console.log('connect in order',state, props)
    return {
        step : state && state.checkoutstep,
        summaryform : state && state.summaryform,
        addressform : state && state.addressform,
        carttotal : state && state.carttotal,
        cartdetails : state && state.cartdetails,
    }
})(Order) 