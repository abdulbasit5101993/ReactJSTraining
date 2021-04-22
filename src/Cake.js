import { Link } from 'react-router-dom';
function Cake(props) {    
    var imgStyle = {
        width : '100%',
        height : '250px',
        float : 'left'
        };
    
    return (
            
                <div className="col-md-3 col-sm-12 col-xs-12 mb-3" style={{float:"left"}}>
                <div className="card">
                    <Link to={'/cake/'+props.cakedata.cakeid}>
                    <img src={props.cakedata.image} className="card-img-top img img-responsive hover-overlay p-3" alt={props.cakedata.alt} style={imgStyle}></img>
                    
                    <div className="card-body">
                    <h5 className="card-title">{props.cakedata.name}</h5>
                    <h5 className="card-title">{props.cakedata.price}</h5>
                    </div>
                    </Link>
                </div>
                </div>
            
    );
}

export default Cake;