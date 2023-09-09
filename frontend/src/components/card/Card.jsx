import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EmotionButton from "../emotionButton/EmotionButton";

export default function Card({ cards, onCardClick, onDeletePlace }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="galery__item">
      <img
        className="galery__img"
        src={cards.link}
        onClick={() => onCardClick(cards)}
        alt={`Изображение ${cards.name}`}
      />
      <div className="galery__item-description">
        <h2 className="galery__item-title">{cards.name}</h2>
        <EmotionButton likes={cards.likes} myId={currentUser._id} cardId={cards._id}/>
      </div>
      {cards.owner._id === currentUser._id && (
        
        <button
          className="galery__delete"
          type="button"
          aria-label="delete-galery-item"
          onClick={() => onDeletePlace(cards._id)}
        />
      )}
    </div>
  );
}
