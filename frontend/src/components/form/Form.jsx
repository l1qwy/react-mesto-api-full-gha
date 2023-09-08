export default function Form({
  name,
  textButton,
  children,
  onSubmit,
  isValid,
  title,
}) {
  return (
    <form name={name} noValidate onSubmit={onSubmit} className="form__login">
      {name === "result" ? (
        ""
      ) : (
        <h3
          className={`form__title ${
            name === "signIn" || name === "signUp" ? "form__title_register" : ""
          }`}
        >
          {title}
        </h3>
      )}
      {children}
      {name === "result" ? (
        ""
      ) : (
        <button
          className={`submit ${
            name === "signIn" || name === "signUp" ? "submit_register" : ""
          } ${isValid ? "" : "submit_disabled"}`}
          type="submit"
          aria-label="login-form"
          disabled={isValid ? false : true}
        >
          {textButton}
        </button>
      )}
      {/* {
        {
          login: (
            <button
              className={`submit ${
                name === "signIn" || name === "signUp" ? "submit_register" : ""
              } ${isValid ? "" : "submit_disabled"}`}
              type="submit"
              aria-label="login-form"
              disabled={isValid ? false : true}
            >
              {textButton}
            </button>
          ),
          popup: (
            <button
              className={`submit ${
                name === "signIn" || name === "signUp" ? "submit_register" : ""
              } ${isValid ? "" : "submit_disabled"}`}
              type="submit"
              aria-label="register-form"
              disabled={isValid ? false : true}
            >
              {textButton}
            </button>
          ),
        }[`${name === "signIn" || name === "signUp" ? "login" : "popup"}`]
      } */}
      {/* <button
        className={`submit ${
          name === "signIn" || name === "signUp" ? "submit_register" : ""
        } ${isValid ? "" : "submit_disabled"}`}
        type="submit"
        aria-label="login-form"
        disabled={isValid ? false : true}
      >
        {textButton}
      </button> */}
    </form>
  );
}
