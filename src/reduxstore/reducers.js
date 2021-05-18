var demo = function(state ={user:null}, action){
    switch(action.type){
        case "LOGIN":{
            state = {...state}
            state["isfetching"]=true
            // state["user"] =action.payload
            return state
        }

        case "LOGIN_SUCCESS":{
            console.log("here we go to login success")
            state = {...state}
            state["isloggedin"]=true
            state["isfetching"]=false
            state["user"] =action.payload
            return state
        }
        
        case "LOGIN_FAILURE":{
            console.log("here we go to login failure")
            state = {...state}
            state["isloggedin"]=false
            state["isfetching"]=false
            return state
        }

        case "INTIALIZE_USER":{
            state = {...state}
            state["isloggedin"]=true
            state["user"] =action.payload
            return state
        }

        case "LOGOUT":{
        
            state = {...state}
            localStorage.clear()
            delete state["isloggedin"]
            delete state["user"]
            delete state["cardata"]
            delete state["cartdetails"]
            delete state["iscartdata"]
            delete state["checkoutstep"]
            return state
        }

        case "ADDTOCART": {
            state = {...state}
            state["cartdata"] = action.payload
            return state
        }
        
        case "CARTTOTAL": {
            state = {...state}
            state["carttotal"] = action.payload
            return state
        }

        case "CARTDETAILS": {
            state = {...state}
            state["cartdetails"] = action.payload
            state["iscartdata"]=true
            return state
        }

        case "CHECKOUTSTEP": {
            state = {...state}
            state["checkoutstep"]=action.payload
            return state
        }
        
        case "SUMMARYFORM": {
            state = {...state}
            state["summaryform"]=action.payload
            return state
        }
        case "ADDRESSFORM": {
            state = {...state}
            state["addressform"]=action.payload
            return state
        }
        case "PAYMENTFORM": {
            state = {...state}
            state["paymentform"]=action.payload
            return state
        }
        case "ORDERFORM": {
            state = {...state}
            state["orderform"]=action.payload
            return state
        }
        case "PLACEORDER": {
            state = {...state}
            state["isfetching"]=true
            state["orderformdata"]=action.payload
            return state
        }
        case "ORDER_PLACED_SUCCESS": {
            state = {...state}
        
            delete state["cardata"]
            delete state["cartdetails"]
            delete state["checkoutstep"] 
            delete state["iscartdata"] 
            delete state["summaryform"] 
            delete state["addressform"] 
            delete state["paymentform"] 
            delete state["orderform"]
        
            state["isfetching"]=false
            
            return state
        }
        case "ORDER_PLACED_FAILURE": {
            state = {...state}
            state["isfetching"]=false
            return state
        }
        case "ORDER_DETAILS":
		{
			state = {...state}
			state["isorderdetailsfetch"] = true
			console.log("Before ORDER_DETAILS state =", state)

			return state
		}
        case "ORDER_DETAILS_SUCCESS":
		{
			state = {...state}
			state["isorderdetailsfetch"] = false
			state["error_orderDetails"] = null
			state["cake_orders"] = action.payload
			console.log("After ORDER_DETAILS state =", state)

			return state
		}
		case "ORDER_DETAILS_FAILURE":
		{
			state = {...state}
			state["isorderdetailsfetch"] = false
			state["error_orderDetails"] = action.orderDetailsError
			console.log("After ORDER_DETAILS state =", state)

			return state
		}

        default : return state
    }
}

export default demo