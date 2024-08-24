import { useEffect, useState } from "react"
import "../styles/cards.css"

const Card = ({ id, img, name, handleClick }) => {
    return (
        <div className="card" onClick={() => handleClick(id)} id={id}>
            <img className="pokeImg" src={img} alt={name} />
            <caption className="pokeName">{name}</caption>
        </div>
    );
};

export default Card;
