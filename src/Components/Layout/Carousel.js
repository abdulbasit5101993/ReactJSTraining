function Carousel() {
    var carousel1='carousel1.jpg';
    var carousel2='carousel2.jpg';
    var carousel3='carousel3.jpg';
    var carousel4='carousel4.jpg';
    var carousel5='carousel5.jpg';
    var carousel6='carousel6.jpg';
    var carousel7='carousel7.jpg';

    return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade mt-5 mb-5" data-ride="carousel">
            <div className="carousel-inner ">
              <div className="carousel-item active">
              <div className="carousel-caption d-none d-md-block">
                  <h1 className="text text-dark font-weight-bold">We deliver happiness to your celebrations</h1>
              </div>
                <img src={carousel7} className="d-block w-100" alt={carousel4}>
                </img>
              </div>
              <div className=" carousel-item">
                <img src={carousel4} className="d-block w-100" alt={carousel1}></img>
              </div>
              <div className="carousel-item">
                <img src={carousel5} className="d-block w-100" alt={carousel1}></img>
              </div>
            </div>
              <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon bg-info p-3" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span className="carousel-control-next-icon bg-info p-3" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
          </div>
    );
}

export default Carousel;
