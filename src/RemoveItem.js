import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {connect} from "react-redux"
import axios from "axios"

function RemoveItem(props){
    let params = useParams()
    console.log(props,params)
    var getCartDetails = ()=>{
        let getcartdetails ="https://apifromashu.herokuapp.com/api/cakecart"
            axios({
                url:getcartdetails,
                method:"post",
                headers: {
                    authtoken: localStorage.getItem('token')
                },
            }).then((response)=>{   
                console.log("response from get cake cart api : ", response.data)
                if(response.data){
                props.dispatch({
                type:"CARTDETAILS",
                payload:response.data.data
                })
                var data = response.data.data;
                var total = 0;
                data.forEach(data => {
                    total += data.price;
                });
                props.dispatch({
                type:"CARTTOTAL",
                payload:total
                })
                }
            }, (error)=>{
                console.log("error response from add to cart api : ", error)
            })
    }
    useEffect(()=>{
        let removeitemapiurl = "https://apifromashu.herokuapp.com/api/removecakefromcart"
        axios({
            url:removeitemapiurl,
            method:"post",
            data:{cakeid:params.cakeid},
            headers: {
                authtoken: localStorage.getItem('token')
            },
        }).then((response)=>{
            console.log("response from delete api : ",response.data)
            props.history.push("/cart")
            getCartDetails()
        }, (error)=>{
            console.log("response from cakes api : ",error)
        })
    }, [])
    return(<div>
            <strong className="text text-success">
            Please Wait ... removing Item from Cart
            </strong> 
    </div>)
}
export default connect()(RemoveItem)