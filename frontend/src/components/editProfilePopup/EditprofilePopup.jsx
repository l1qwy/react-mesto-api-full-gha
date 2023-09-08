import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ onOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    inputValue,
    errorMessage,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    setValue("nameProfile", currentUser.name);
    setValue("jobProfile", currentUser.about);
  }, [currentUser, setValue]);

  function resetForm() {
    onClose();
    reset({ nameProfile: currentUser.name, jobProfile: currentUser.about });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(
      {
        nameProfile: inputValue.nameProfile,
        jobProfile: inputValue.jobProfile,
      },
      reset
    );
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      onOpen={onOpen}
      onClose={resetForm}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className={`form__field form__field_input_name ${
          isInputValid.nameProfile === undefined || isInputValid.nameProfile
            ? ""
            : "form__error"
        }`}
        id="name-pfofile"
        type="text"
        name="nameProfile"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        value={inputValue.nameProfile ? inputValue.nameProfile : ""}
        onChange={handleChange}
      />
      <div
        className={`form__error-container ${
          isInputValid.nameProfile ? "" : "form__field_error"
        }`}
      >
        <span id="name-pfofile-error">{errorMessage.nameProfile}</span>
      </div>
      <input
        className={`form__field form__field_input_job ${
          isInputValid.jobProfile === undefined || isInputValid.jobProfile
            ? ""
            : "form__error"
        }`}
        id="job-profile"
        type="text"
        name="jobProfile"
        placeholder="Деятельность"
        minLength={2}
        maxLength={200}
        required
        value={inputValue.jobProfile ? inputValue.jobProfile : ""}
        onChange={handleChange}
      />
      <div
        className={`form__error-container ${
          isInputValid.jobProfile ? "" : "form__field_error"
        }`}
      >
        <span id="job-profile-error">{errorMessage.jobProfile}</span>
      </div>
    </PopupWithForm>
  );
}
