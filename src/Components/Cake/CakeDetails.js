import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, /* faHeart */ } from '@fortawesome/free-solid-svg-icons'
var base_url = process.env.REACT_APP_BASE_URL;
const star = <FontAwesomeIcon icon={faStar} />
// const heart = <FontAwesomeIcon icon={faHeart} />
function CakeDetails(props){
    let [cakedetails, setCakedetails] = useState({})
    let [cakeIngredients, setcakeIngredients] = useState([])
    let params = useParams()

    useEffect(()=>{
        let cakedetailsapi = base_url+"/api/cake/"+params.cakeid
        axios({
            url:cakedetailsapi,
            method:"get"
        }).then((response)=>{
            console.log("response from cakes api : ",response.data.data)
            setCakedetails(response.data.data)
            setcakeIngredients(response.data.data.ingredients)
        }, (error)=>{
            console.log("response from cakes api : ",error)
        })
    }, [])

    var getCartDetails = ()=>{
        let getcartdetails = base_url+"/api/cakecart"
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
    if(props.user  !== undefined){
    var addToCart = (event)=>{
        event.preventDefault()
        let addtocarturl = base_url+"/api/addcaketocart"
            axios({
                url:addtocarturl,
                headers: {
                    authtoken: props?.token
                },
                method:"post",
                data: {cakeid:cakedetails.cakeid,name:cakedetails.name, image:cakedetails.image, price:cakedetails.price,weight:cakedetails.weight}
            }).then((response)=>{   
                console.log("response from add to cart api : ", response.data)
                props.dispatch({
                    type:"ADDTOCART",
                    payload:response.data.data
                })
                if(!props.checkoutstep){
                    props.dispatch({
                        type:"CHECKOUTSTEP",
                        payload:1
                    })
                }
                getCartDetails()
                props.history.push("/cart")
            }, (error)=>{
                console.log("error response from add to cart api : ", error)
            }) 
            console.log('here');
    }
    }
    return(

        <div className="card col-md-10 offset-md-1 col-sm-12 col-xs-12">
        <div className="card-body text-center p-5" style={{backgroundColor: "rgba(0,0,0,.03)"}}>
            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <div>
                        <img src={cakedetails.image} 
                        className="card-img-top img img-responsive" alt="..." style={{height:"350px"}} />
                    </div>
                    <div className="mt-4">
                    {cakeIngredients?.length >0 && <div className="font-weight-bold" style={{fontSize: "18px"}}>Ingredient:</div>} 
                    
                    <div style={{fontSize: "16px"}}>
                        {cakeIngredients?.length >0 && cakeIngredients.map((each, key) => { 
                            if(cakeIngredients.length -1 === key){
                                return(<span>{each}</span>)
                            } else{
                                return(<span>{each + ' | '}</span>)
                            }
                        })}
                        <br/>
                        
                        { !props.user ? 
                        <button type="button" className="btn btn-secondary text-uppercase p-3 text-white mr-2 mt-3 font-weight-bold"  title="kindly login to Add" disabled>Add to cart</button> 
                        :
                        <button type="button" className="btn btn-warning text-uppercase p-3 text-white mr-2 mt-3 font-weight-bold" onClick={addToCart}>Add to cart</button>
                        }
                        
                    </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <div style={{margin: "10px 10px"}}>
                        <h2 className="text-uppercase font-weight-bold pb-3">{cakedetails.name}</h2>
                        <div className="pb-3">
                            <span className="text-warning">{star} {cakedetails.ratings}</span>
                            <br/><span style={{fontSize: "18px"}}>{cakedetails.reviews} reviews</span>
                        </div>
                        <div className="pb-3">{cakedetails.description}</div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Current price: 
                            <span className="text-warning"> ${cakedetails.price}</span>
                            </span>
                        </div>
                        <div className="pb-3"><span className="font-weight-bold">91%</span> of user enjoyed this product!
                            <span className="font-weight-bold"> (87 votes)</span>
                        </div>

                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Weight: {cakedetails.weight}KG</span></div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Flavour: 
                                <span className="font-italic text-warning"> {cakedetails.flavour}</span>
                            </span>
                        </div>
                        <div className="pb-3 text-uppercase" style={{fontSize: "23px"}}><span className="font-weight-bold">type</span><br/>{cakedetails.type}</div>                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default connect(function(state,props){
    return {
        'user': state && state?.user,
        'token': state && state?.user?.token,
    }
})(CakeDetails);  