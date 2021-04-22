import { connect } from 'react-redux';
function Summary(props){

    return(
        <div>Summary {props.step}</div>
    )    
}

export default connect(function(state,props){
    return {
        step : state.checkoutstep,
    }
})(Summary)