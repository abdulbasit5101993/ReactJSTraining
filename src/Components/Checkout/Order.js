import { connect } from 'react-redux';
function Order(props){
    return(
        
        <div>Order {props.step}</div>
    )
}

export default connect(function(state,props){
    return {
        step : state.checkoutstep,
    }
})(Order) 