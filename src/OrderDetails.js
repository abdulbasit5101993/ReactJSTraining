import { connect } from "react-redux";
import { Link , withRouter } from "react-router";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoodIcon from "@material-ui/icons/Mood";
import {useState, useEffect} from 'react';

function OrderDetails(props){
    
    props.dispatch({
        type : "ORDER_DETAILS"
    })
//useEffect((console.log("props for cake_orders = ",props.cake_orders)), []);
return(

    <div><h1
    style={{
        margin: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        paddingBottom: "20px",
        padding: "20px",
    }}
    >
    My Orders  <ShoppingCartIcon style={{ fontSize: "40px" }} />
    </h1>
    <div className="row" style={{ padding: "10px" }}>
    {props.myOrder?.length > 0 ? (
        <>
        <div className="col-sm-8 col-md-8 col-md-offset-1 container">
            <table className="table table-hover">
            <thead>
            <th className="text-center">Image</th>
            <th className="text-center">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Status</th>
            </thead>

            <tbody>
            {props.myOrder.map((data, index) => {
                return data.cakes.map((cake, index1) => {
                    return (
                    <tr key={Math.random().toString()} >
                        <td className="text-center">
                        <img
                            className="media-object"
                            src={cake?.image}
                            style={{ width: "50px", height: "50px" }}
                            alt="..."
                        />
                        </td>
                        <td className="text-center">
                        <p
                            className="media-heading"
                            style={{ wordBreak: "break-all" }}
                        >
                            <strong>{cake?.name}</strong>
                        </p>
                        </td>
                        <td className="text-center">
                        <strong>${cake.price}</strong>
                        </td>
                        <td className="text-center">
                        <strong>{cake.quantity}</strong>
                        </td>
                        <td className="text-center">
                        <strong>{data?.pending ? "Pending" : "Completed"}</strong>
                        </td>
                    </tr>
                    );
                });
                
                })}
            </tbody>
            </table>
        </div>
        
        </>
    ) : (
        <div className="alert alert-danger container" role="alert">
        <h4 className="alert-heading" style={{ textAlign: "center" }}>
            {props.error_orderDetails}!
        </h4>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
            Place  Order{!props?.token && ", Please login"}
            </p>

            <p className="mb-0">
            Sweet Shopping <MoodIcon style={{ color: "#08aae8" }} /> !
            </p>
        </div>
        </div>
    )}
    </div></div>
    )
}

export default connect(function (state, props) {
console.log("state?.cake_orders ", state?.cake_orders)

return {
    token: state?.user?.token,
    myOrder : state?.cake_orders,
    error_orderDetails  : state?.error_orderDetails
};
})(withRouter(OrderDetails));