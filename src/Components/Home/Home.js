import './Home.css';
import foodImage1 from '../../images/foodImage1.jpg';

function Home() {
  const style = {
    backgroundImage: 'url(' + foodImage1 + ')',
  };

  return (
    <div className="home">
      <div className="left">
        <h1>About this app:</h1>
        <ul>
          <li>This app does some things that you should know about</li>
          <li>something about random recipe display</li>
          <li>something about axios calls</li>
        </ul>
      </div>
      <div className="right" style={style}></div>
    </div>
  );
}

export default Home;
