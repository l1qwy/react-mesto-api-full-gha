import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function EditAvatarPopup({ onOpen, onClose, onUpdateAvatar }) {
  const input = useRef();
  const {
    inputValue,
    errorMessage,
    isValid,
    isInputValid,
    handleChange,
    reset,
  } = useFormValidation();

  function resetForm() {
    onClose();
    reset();
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ avatarProfile: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="avatar-profle"
      title="Обновить аватар"
      textButton="Сохранить"
      onOpen={onOpen}
      onClose={resetForm}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        ref={input}
        className={`form__field form__field_change_avatar ${
          isInputValid.avatarProfile === undefined || isInputValid.avatarProfile
            ? ""
            : "form__error"
        }`}
        id="url-avatar"
        type="url"
        name="avatarProfile"
        placeholder="Ссылка на аватар"
        required
        value={inputValue.avatarProfile ? inputValue.avatarProfile : ""}
        onChange={handleChange}
      />
      <div
        className={`form__error-container ${
          isInputValid.avatarProfile ? "" : "form__field_error"
        }`}
      >
        <span id="url-avatar-error">{errorMessage.avatarProfile}</span>
      </div>
    </PopupWithForm>
  );
}
