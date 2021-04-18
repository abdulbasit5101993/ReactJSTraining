import axios from "axios";
import { useEffect, useState} from "react";
import Cake from "./Cake";
function Search(){
    let [cakes, setCakes] = useState([]);
    let searchcakesapi='https://apibyashu.herokuapp.com/api/searchcakes?q=mango';
    useEffect(()=>{
        axios({
            method:"get",
            url:searchcakesapi,
        }).then((response)=>{
            console.log("Mango cake", response.data);
            setCakes(response.data.data);
            // console.log(cakes);
        }, (error) => {
            console.log("error from all cakes api,", error);
        })
    },[]);
    return (
        <div className="row">
            {cakes?.length>0 && cakes.map((each,index)=> {
                return <Cake cakedata={each} key={index} />
            })};
        </div>
    )
}

export default Search;