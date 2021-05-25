import axios from "axios";
import { useEffect, useState} from "react";
import { connect } from 'react-redux';
import Carousel from '../Layout/Carousel';
import Cake from './CakeData';

function Home(props){
    let [cakeresults, setCakes] = useState([]);
    var base_url = process.env.REACT_APP_BASE_URL;
    useEffect(()=>{
        axios({
            method:"get",
            url:base_url+'/api/allcakes',
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