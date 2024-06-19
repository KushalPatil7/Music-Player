import React from 'react';

const Card = (props) => {
  return (
    <div>
      <div className="card" >
        <img src={props.link} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            Artist: {props.info}
          </p>
          <p className="card-text">
            Release Date: {props.date}
          </p>
          <audio src={props.song} controls className='w-100'> </audio>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  );
}

export default Card;
