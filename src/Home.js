import Carousel from './Carousel.js';
import axios from "axios";
import Cake from "./Cake";
import { useEffect, useState} from "react";
function Home(){
    let [cakeresults, setCakes] = useState([]);
    let allcakeapi='https://apibyashu.herokuapp.com/api/allcakes';
    useEffect(()=>{
        axios({
            method:"get",
            url:allcakeapi,
        }).then((response)=>{
            // console.log("response from all cakes api", response.data);
            setCakes(response.data.data);
            // console.log(cakes);
        }, (error) => {
            console.log("error from all cakes api,", error);
        })
    },[]);
    return (
        <div className="row">
            {cakeresults?.length>0 ? cakeresults.map((each,index)=> {
                return <Cake cakedata={each} key={index} />
            }) : <div className="alert alert-danger"> No Results Found </div>
            };
        </div>
    );
}

export default Home;