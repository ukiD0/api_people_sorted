import React from "react";
import './index.css';

 //обработка джсончика
export const Collection = ({images, name,sex,country}) => {
    return (
        <div className="collection">
            <img  className="collection_img" src={images} alt="Item" />
            <div className="collection__bottom"> 
            <h4>{name}</h4>
            <h5>{sex}</h5>
            <h6>{country}</h6>
            </div>
        </div> 
    );
}