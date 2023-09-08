import { useEffect, useState } from "react";
import api from "../../utils/Api";

export default function EmotionButton({ likes, myId, cardId }) {
  const [isLike, setIsLike] = useState(false);
  const [isCountLike, setIsCountLikes] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((item) => myId === item._id));
  }, [likes, myId]);

  function handleLike() {
    if (isLike) {
      api
        .unactiveLike(cardId, localStorage.jwt)
        .then((res) => {
          setIsLike(false);
          setIsCountLikes(res.likes.length);
        })
        .catch((error) => console.error("Ошибка кнопки лайка" + error));
    } else {
      api
        .activeLike(cardId, localStorage.jwt)
        .then((res) => {
          setIsLike(true);
          setIsCountLikes(res.likes.length);
        })
        .catch((error) => console.error("Ошибка кнопки лайка" + error));
    }
  }

  return (
    <div>
      <button
        className={`galery__item-emotion ${isLike ? 'galery__item-emotion_active' : ''}`}
        type="button"
        aria-label="galery-emotion"
        onClick={handleLike}
      />
      <span className="galery__counter">{isCountLike}</span>
    </div>
  );
}
