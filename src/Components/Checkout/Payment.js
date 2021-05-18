import {useState} from "react"
import { connect } from 'react-redux';
function Payment(props){
    var [formerrors, setFormerrors] = useState({})
    
    var validate = function(elements){
        var errors = {}
        console.log("Payment elements received for validation",elements)
        console.log(elements.paymentoption.value)

        if(!elements.paymentoption.value){
            errors.paymentoption = "Payment Option Should be Selected"
        }
        var errorKeys = Object.keys(errors)
        if(errorKeys.length>0){
            return errors
        }
        else{
            return false
        }

    }
    var savePayment = (event) =>{
        event.preventDefault()
        var form = document.getElementById('paymentform')
        console.log("Form Elements in this", form.elements)
        console.log("Payment", form.elements.paymentoption.value)
        var errors = validate(form.elements)
        if(errors){
            setFormerrors(errors)
        }else{
            setFormerrors({})
            if(props.step === 3){
                props.dispatch({
                    type:"CHECKOUTSTEP",
                    payload:4
                })
            }
            props.dispatch({
                type:"PAYMENTFORM",
                payload:{paymentoption:form.elements.paymentoption.value}
            })
            props.history.push("/checkout/order")
        }
    }
    return(
        <div>
            <h5 className="text-center"> Payment </h5>
        <form id="paymentform" className="p-4">
        <fieldset className="form-group row">
    {/* <legend className="col-form-label col-sm-2 float-sm-left pt-0">Payment Optip</legend> */}
    <div className="col-sm-10">
            {props.paymentform?.paymentoption}
            <div className="text-danger">
                {formerrors?.paymentoption && <div>{formerrors.paymentoption}</div>}
            </div>
        <div className="form-check">
        <input className="form-check-input" type="radio" name="paymentoption" id="gridRadios1" value="option1"></input>
        <label className="form-check-label" for="gridRadios1">
            Cash On Delivery
        </label>
        </div>
        <div className="form-check">
        <input className="form-check-input" type="radio" name="paymentoption" id="gridRadios2" value="option2"></input>
        <label className="form-check-label" for="gridRadios2">
            Paypal
        </label>
        </div>
        <div className="form-check disabled">
        <input className="form-check-input" type="radio" name="paymentoption" id="gridRadios3" value="option3"></input>
        <label className="form-check-label" for="gridRadios3">
            Credit Card/ Debit Card
        </label>
        </div>
    </div>
    </fieldset>
    <button onClick={savePayment} className="btn btn-success mt-2">Continue to Place Order</button>
    </form>
    </div>
    )
}

export default connect(function(state,props){
    return {
        step : state && state.checkoutstep,
        paymentform : state && state.paymentform,
    }
})(Payment) 