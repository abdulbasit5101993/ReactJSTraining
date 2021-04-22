import { connect } from 'react-redux';
function Payment(props){
    return(
        
        <div>Payment {props.step}</div>
    )
}

export default connect(function(state,props){
    return {
        step : state.checkoutstep,
    }
})(Payment) 