export function enableValidation(config) {
  const cfg = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible'
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonForm) => {
    if (hasInvalidInput(inputList)) {
      buttonForm.classList.add(config.inactiveButtonClass);
    }
    else {
      buttonForm.classList.remove(config.inactiveButtonClass);
    }
  };

  const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonForm = formEl.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonForm);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        checkInputValidity(formEl, inputEl, config);
        toggleButtonState(inputList, buttonForm);
      });
    });
  };

  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((item) => {
    setEventListeners(item, config);
  });

  const showInputError = (formEl, inputEl, errorMessage, config) => {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    errorEl.textContent = errorMessage;
    if (inputEl.validity.patternMismatch) {
      errorEl.textContent = `${errorMessage} Например: https://cat.png`;
    }
    errorEl.classList.add(config.errorClass);
  };

  const hideInputError = (formEl, inputEl, errorMessage, config) => {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    errorEl.textContent = "";
    errorEl.classList.remove(config.errorClass);
  };


  const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, inputEl.validationMessage, config);
    }
    else {
      hideInputError(formEl, inputEl, inputEl.validationMessage, config);
    }
  };

};
