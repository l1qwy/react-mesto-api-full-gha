import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function AddPlacePopup({ onOpen, onClose, onAddPlace }) {
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
    onAddPlace({ name: inputValue.name, link: inputValue.link }, reset);
  }

  return (
    <PopupWithForm
      name="add-item"
      title="Новое место"
      textButton="Создать"
      onOpen={onOpen}
      onClose={resetForm}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className={`form__field form__field_input_name form__field_input_title ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "form__error"
        }`}
        id="name-img"
        type="text"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        value={inputValue.name ? inputValue.name : ""}
        onChange={handleChange}
      />
      <div
        className={`form__error-container ${
          isInputValid.name ? "" : "form__field_error"
        }`}
      >
        <span id="name-img-error">{errorMessage.name}</span>
      </div>
      <input
        className={`form__field form__field_input_job form__field_input_url ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "form__error"
        }`}
        id="url-img"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={inputValue.link ? inputValue.link : ""}
        onChange={handleChange}
      />
      <div
        className={`form__error-container ${
          isInputValid.link ? "" : "form__field_error"
        }`}
      >
        <span id="url-img-error">{errorMessage.link}</span>
      </div>
    </PopupWithForm>
  );
}
