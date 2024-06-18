import React from "react";
import "./card.css";

export default function Card(props) {
  return (
    <div>
      <div className="card">
        <h1 className="cardText">Name: {props.name}</h1>
        <h4 className="cardText">Age: {props.age}</h4>
        <h5 className="cardText">Village: {props.village}</h5>
        <div className="btnDiv">
          <button onClick={props.deleteBtn} className="cardDeleteBtn">
            {props.dele}
          </button>
          <button onClick={props.editBtn} className="cardEditBtn">
            {props.edit}
          </button>
        </div>
      </div>
    </div>
  );
}
