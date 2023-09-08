import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function InfoTooltip({ name, onOpen, onClose, isSuccessfully }) {
  return (
    <PopupWithForm name={name} onOpen={onOpen} onClose={onClose}>
      <div
        className={`popup__reg-img ${
          !isSuccessfully ? "popup__reg-img_error" : ""
        }`}
      />
      <p className="popup__reg-note">
        {isSuccessfully
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз"}
      </p>
    </PopupWithForm>
  );
}
