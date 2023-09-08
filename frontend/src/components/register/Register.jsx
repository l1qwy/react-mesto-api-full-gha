import useFormValidation from "../../utils/useFormValidation";
import PageLogin from "../pageLogin/PageLogin";

export default function Register({ name, onRegister }) {
  const {
    inputValue,
    errorMessage,
    isValid,
    isInputValid,
    handleChange,
  } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(inputValue.password, inputValue.email);
  }

  return (
    <PageLogin name={name} onSubmit={handleSubmit} isValid={isValid}>
      <input
        className={`form__field ${name === "signUp" ? "form__field_register" : ""} ${
          isInputValid.email === undefined || isInputValid.email
            ? ""
            : "form__error"
        } `}
        id="email-reg"
        type="email"
        name="email"
        placeholder="Email"
        minLength={3}
        maxLength={30}
        required
        value={inputValue.email ? inputValue.email : ""}
        onChange={handleChange}
      />
      <div
        className={`form__error-container ${
          isInputValid.email ? "" : "form__field_error"
        }`}
      >
        <span id="name-img-error">{errorMessage.email}</span>
      </div>
      <input
        className={`form__field ${
          isInputValid.password === undefined || isInputValid.password
            ? ""
            : "form__error"
        } ${name === "signUp" ? "form__field_register" : ""}`}
        id="password-reg"
        type="password"
        name="password"
        placeholder="Пароль"
        minLength={3}
        maxLength={30}
        required
        value={inputValue.password ? inputValue.password : ""}
        onChange={handleChange}
      />
      <div
        className={`form__error-container ${
          isInputValid.password ? "" : "form__field_error"
        }`}
      >
        <span id="url-img-error">{errorMessage.password}</span>
      </div>
    </PageLogin>
  );
}
