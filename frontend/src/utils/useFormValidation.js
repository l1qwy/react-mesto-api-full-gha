import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [inputValue, setInputValue] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const validationMessage = event.target.validationMessage;
    const valid = event.target.validity.valid;
    const form = event.target.form;

    setInputValue((startInputs) => {
      return { ...startInputs, [name]: value };
    });

    setErrorMessage((message) => {
      return { ...message, [name]: validationMessage };
    });

    setIsValid(form.checkValidity());

    setIsInputValid((isValid) => {
      return { ...isValid, [name]: valid };
    });
  }

  function reset(data = {}) {
    setInputValue(data);
    setErrorMessage({});
    setIsValid(false);
    setIsInputValid({});
  }

  const setValue = useCallback((name, value) => {
    setInputValue((startInputs) => {
      return { ...startInputs, [name]: value };
    });
  }, []);

  return {
    inputValue,
    errorMessage,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  };
}
