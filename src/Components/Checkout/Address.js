import {useState} from "react"
import { connect } from 'react-redux';
function Address(props){
    
    var [formerrors, setFormerrors] = useState({})
    
    var validate = function(elements){
        var errors = {}
        console.log("elements received for validation",elements)
        if(!elements.address.value){
            errors.address = "Address is Required"
        }
        var errorKeys = Object.keys(errors)
        if(errorKeys.length>0){
            return errors
        }
        else{
            return false
        }

    }
    
    var placeOrder = function(event){
        event.preventDefault()
        var form = document.getElementById('addressform')
        console.log("Form Elements in this", form.elements)
        var errors = validate(form.elements)
        if(errors){
            setFormerrors(errors)
        }else{
            setFormerrors({})
            alert("Form Validated Successfully")
            if(props.step == 1){
                props.dispatch({
                    type:"CHECKOUTSTEP",
                    payload:2
                })
            }

        }
    }
    return(
        <div>
        <form id="addressform" className="p-4">
            <div className="form-group">
            <label>Address</label> {props.step}
            <input type="text" name="address" className="form-control"></input>
            <div className="text-danger">
                {formerrors?.address && <div>{formerrors.address}</div>}
            </div>
            </div>
            <button onClick={placeOrder} className="btn btn-success">Place Order</button>
        </form>
        </div>
    )
}

export default connect(function(state,props){
    return {
        step : state.checkoutstep,
    }
})(Address)