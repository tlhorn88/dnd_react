import "./Card2.css";

function Card (props) {
  const image = props.img;
  const style = { 
    backgroundImage: 'url(' + image + ')',
};


  return (
    <div className="card">
      <div className="cardHeader" style={style}>
        <h4 className="cardHeaderTitle">{props.name}</h4>
      </div>
      <div className="cardBody">
        <h1 className="cardHeaderTitle">{props.name}</h1>
        <p className="description">This is going to be the most delicious food that you have ever eaten.</p>
        <div className="ingredients">
          <p>cows</p>
        </div>
      </div>
    </div>
  )
}

      // /* <img className="photo" alt="" src={(`${props.img}`)} />
      // <div className="cardInfo">
        // <h2 className="title">{props.name}</h2>
        // <div className="time">
          // <p>{props.time + ' mins.'}</p>
        // </div>
        // <div className="likes">
          // <p>{'♥ ' + props.likes}</p>
        // </div>
      // </div> */}
//   )
// }

export default Card;