import React from 'react';

const Item = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.shoes.map((item, index) => {
          return (
            <div className="col-md-4" key={index}>
              <img src={item.src} width="80%" />
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <p>{item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Item;