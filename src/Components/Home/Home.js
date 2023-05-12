import './Home.css';
import foodImage1 from '../../images/foodImage1.jpg';


function Home() {
  // const image = [foodImage1];
  const style = { 
    backgroundImage: 'url(' + foodImage1 + ')',
};


  return (
    <div className='home'>
      <div className='left'>
        <h1>Meow meow meow</h1>
        <img className='testImage' src={require("../../images/foodImage1.jpg")} />
      </div>
      <div className='right' style={style}>
      </div>
    </div>

  )
}

export default Home;