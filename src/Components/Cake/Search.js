import Cake from './CakeData';
import {useState, useEffect} from 'react';
import axios from "axios"
function Search(props){
    var base_url = process.env.REACT_APP_BASE_URL;
    var [cakes,setCakes]=useState([]);  
    var [error,setError]=useState('')
    
    const query = new URLSearchParams(props.location.search)
    const cake = query.get('cake')

    useEffect(()=>{
        setError('')
        let searchcakes = base_url+"/api/searchcakes?q="+cake
        axios({
            url:searchcakes,
            method:"get"
        }).then((response)=>{
            console.log("response from search cakes api : ", response.data.data)
            setCakes(response.data.data)
            
            if(response.data.data.length === 0){
                setError("No result found. Please try some other cakes.")
            }

        }, (error)=>{
            console.log("error from search cakes api : ",error)
            

        })
    },[])
    return (
        <div className="col-md-12 col-sm-12 col-xs-12">
            
        {/* <div className="col-md-3 col-sm-12 col-xs-12 mb-3"> */}
            {cakes?.length>0 ? cakes.map((each,index)=> {
                return <Cake cakedata={each} key={index} />
            }) : <div className="alert alert-danger">No Data Found</div>
        }
        {/* </div> */}
        </div>
    )
}

export default Search;