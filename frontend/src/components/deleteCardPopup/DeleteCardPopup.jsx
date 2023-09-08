import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function DeleteCardPopup({ onOpen, onClose, onDeleteCard }) {

  function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete-item"
      title="Вы уверены ?"
      textButton="Да"
      onOpen={onOpen}
      isValid={true}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
