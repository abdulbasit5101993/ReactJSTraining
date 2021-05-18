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
        if(!elements.city.value){
            errors.city = "City is Required"
        }
        if(!elements.pincode.value){
            errors.pincode = "Pincode is Required"
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
            if(props.step === 2){
                props.dispatch({
                    type:"CHECKOUTSTEP",
                    payload:3
                })
                props.dispatch({
                    type:"ADDRESSFORM",
                    payload:{address:form.elements.address.value,
                            city:form.elements.city.value,
                            pincode:form.elements.pincode.value}
                })
                props.history.push("/checkout/payment")
            }
        }
    }
    return(
        <div>
        <h5 className="text-center"> Address </h5>
        <form id="addressform" className="p-4">
            <div className="form-group">
                <input value={props.addressform?.address} type="text" name="address" className="form-control" placeholder="Enter Address"></input>
                <div className="text-danger">
                    {formerrors?.address && <div>{formerrors.address}</div>}
                </div>
            </div>

            <div className="form-group">
                <input value={props.addressform?.city} type="text" name="city" className="form-control" placeholder="Enter City"></input>
                <div className="text-danger">
                    {formerrors?.city && <div>{formerrors.city}</div>}
                </div>
            </div>

            <div className="form-group">
                <input value={props.addressform?.pincode} type="text" name="pincode" className="form-control" placeholder="Enter Pincode"></input>
                <div className="text-danger">
                    {formerrors?.pincode && <div>{formerrors.pincode}</div>}
                </div>
            </div>
        <button onClick={placeOrder} className="btn btn-success">Continue to Payment</button>
        </form>
        </div>
    )
}

export default connect(function(state,props){
    return {
        step : state && state.checkoutstep,
        addressform : state && state.addressform,
    }
})(Address)