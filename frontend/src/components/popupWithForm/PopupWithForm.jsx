import React from "react";
import Form from "../form/Form";

export default function PopupWithForm({
  title,
  name,
  textButton,
  children,
  onOpen,
  onClose,
  onSubmit,
  isValid,
}) {
  return (

    <section
      className={`popup popup_type_${name} ${onOpen && "popup_open"}`}
      onClick={onClose}
    >
      <div
        className={`popup__container ${
          name === "delete-item" && "popup__container_delete"
        } ${name === "result" && "popup__container_reg"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="popup__close"
          type="button"
          aria-label="close-popup"
          onClick={onClose}
        />
        <Form 
        name={name}
        title={title}
        textButton={textButton}
        children={children}
        onSubmit={onSubmit}
        isValid={isValid}/>
        {/* <form name={name} noValidate onSubmit={onSubmit}>
          <h3
            className={`form__title ${
              title === {name} && "form__title_delete"
            }`}
          >
            {title}
          </h3>
          {children}
          <button
            className={`submit ${isValid ? "" : "submit_disabled"}`}
            type="submit"
            aria-label="save-form"
            disabled={isValid ? false : true}
          >
            {textButton}
          </button>
        </form> */}
      </div>
    </section>
  );
}
