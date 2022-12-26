export function enableValidation(config) {
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonForm) => {
    if (hasInvalidInput(inputList)) {
      buttonForm.classList.add(config.inactiveButtonClass);
      buttonForm.setAttribute("disabled", "");
    }
    else {
      buttonForm.classList.remove(config.inactiveButtonClass);
      buttonForm.removeAttribute("disabled");
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

export function disableSubmitBtn(submitBtn, disableClass) {
  console.log('asdasdasd');
  submitBtn.classList.add(disableClass);
  submitBtn.setAttribute("disabled", "");
};
