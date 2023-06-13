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
        <ul className='summaryList'>
          <li>Implements a responsive and interactive flip card component for displaying recipe information.</li>
          <li>Utilizes React and React Router for front-end development.</li>
          <li>Fetches recipe data from the Spoonacular API using Axios</li>
          <li>Provides a random recipe feature with dynamically loaded recipe details.</li>
          <li>Implements navigation and search functionality with a responsive navigation bar.</li>
        </ul>
      </div>
      <div className="right" style={style}></div>
    </div>
  );
}

export default Home;
