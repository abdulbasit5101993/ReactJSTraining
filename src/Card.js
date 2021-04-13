function Card(props) {
    var cardStyle = {
                width : '18rem',
                float : 'left'
                };
    var imgStyle = {
        // width : '100px',
        float : 'left'
        };
    
    return (
            <div className="card col-3" style={cardStyle}>
                <img src={props.cakedata.image} className="card-img-top" alt={props.cakedata.alt} style={imgStyle}></img>
                
                <div className="card-body">
                <h5 className="card-title">{props.cakedata.name}</h5>
                <h5 className="card-title">{props.cakedata.price}</h5>
                </div>
            </div>
    );
}

export default Card;