var demo = function(state ={user:null}, action){
    switch(action.type){
        case "LOGIN":{
            console.log("here we go to login")
            state = {...state}
            state["isloggedin"]=true
            state["user"] =action.payload
            return state
        }
        
        case "INTIALIZE_USER":{
            console.log("here we go to login")
            state = {...state}
            state["isloggedin"]=true
            state["user"] =action.payload
            return state
        }

        case "LOGOUT":{
            // console.log("here we go to login")
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

        default : return state
    }
}

export default demo