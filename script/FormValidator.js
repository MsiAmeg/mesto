export class FormValidator {
  constructor(config, formSelector){
    this._config = config;
    this._formSelector = formSelector;
  }

  enableValidation = () => {
    const form = document.querySelector(this._formSelector);
    this._setEventListeners(form);
  }

  _setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(this._config.inputSelector));
    const buttonForm = formEl.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonForm);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(formEl, inputEl, this._config);
        this._toggleButtonState(inputList, buttonForm);
      });
    });
  };

  _toggleButtonState = (inputList, buttonForm) => {
    if (this._hasInvalidInput(inputList)) {
      buttonForm.classList.add(this._config.inactiveButtonClass);
      buttonForm.setAttribute("disabled", "");
    }
    else {
      buttonForm.classList.remove(this._config.inactiveButtonClass);
      buttonForm.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };

    _showInputError = (formEl, inputEl, errorMessage) => {
      const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
      errorEl.textContent = errorMessage;
      if (inputEl.validity.patternMismatch) {
        errorEl.textContent = `${errorMessage} Например: https://cat.png`;
      }
      errorEl.classList.add(this._config.errorClass);
    };

    _hideInputError = (formEl, inputEl, errorMessage) => {
      const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
      errorEl.textContent = "";
      errorEl.classList.remove(this._config.errorClass);
    };

  _checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl, inputEl.validationMessage);
    }
    else {
      this._hideInputError(formEl, inputEl, inputEl.validationMessage);
    }
  };
}

export function disableSubmitBtn(submitBtn, disableClass) {
  submitBtn.classList.add(disableClass);
  submitBtn.setAttribute("disabled", "");
};
