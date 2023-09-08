import Form from "../form/Form";
import { Link } from "react-router-dom";

export default function PageLogin({ name, isValid, onSubmit, children }) {
  return (
    <section className="login ">
      <Form
        title={name === "signUp" ? "Регистрация" : "Вход"}
        name={name}
        textButton={name === "signUp" ? "Зарегистрироваться" : "Войти"}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      />
      {name === "signUp" && (
        <p className="form__note">
          Уже зарегестрированы?{" "}
          <Link to={"/sign-in"} className="form__note-link">
            Войти
          </Link>
        </p>
      )}
    </section>
  );
}
