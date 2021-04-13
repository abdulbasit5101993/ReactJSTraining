import './App.css';
import Carousel from './Carousel.js';
import Card from './Card.js';
import Nav from './Nav.js';
import Signup from './Signup.js';

var myObj = {
        name: 'Choclate Truffle',
        image: 'carousel1.jpg',
        alt: 'image',
        price: 880
        }
function App() {
  return (
    <div className="App">
      <Nav/>
      <Signup/>
      <Carousel/>
            <Card cakedata={myObj}/>
            <Card cakedata={myObj}/>
            <Card cakedata={myObj}/>
            <Card cakedata={myObj}/>
    </div>
  );
}

export default App;
