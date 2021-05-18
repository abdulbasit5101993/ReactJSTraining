import Carousel from './Carousel.js';
import axios from "axios";
import Cake from "./Cake";
import { useEffect, useState} from "react";
import { connect } from 'react-redux';

function Home(props){
    let [cakeresults, setCakes] = useState([]);
    let allcakeapi='https://apifromashu.herokuapp.com/api/allcakes';
    useEffect(()=>{
        axios({
            method:"get",
            url:allcakeapi,
        }).then((response)=>{
            console.log("response from all cakes api", response.data);
            setCakes(response.data.data);
        }, (error) => {
            console.log("error from all cakes api,", error);
        })
    },[]);
    return (
        <div className="col-md-12 col-sm-12 col-xs-12">
                <Carousel></Carousel>
            {cakeresults?.length>0 && cakeresults.map((each,index)=> {
                return <Cake cakedata={each} key={index} />
            })}
            </div>
            
    )
}

export default connect()(Home);