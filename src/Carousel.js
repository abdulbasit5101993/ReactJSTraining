function Carousel() {
    var carousel1='carousel1.jpg';
    var carousel2='carousel2.jpg';
    var carousel3='carousel3.jpg';

    var imgStyle = {
                height : '350px',
                width : '100%'
                };
    return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={carousel1} className="d-block w-100" alt={carousel1} style={imgStyle}></img>
              </div>
              <div className="carousel-item">
                <img src={carousel2} className="d-block w-100" alt={carousel1} style={imgStyle}></img>
              </div>
              <div className="carousel-item">
                <img src={carousel3} className="d-block w-100" alt={carousel1} style={imgStyle}></img>
              </div>
            </div>
              <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
          </div>
    );
}

export default Carousel;
