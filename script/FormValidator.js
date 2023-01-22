export class FormValidator {
  constructor(config, formElement){
    this._config = config;
    this._formSelector = formElement;
  }

  enableValidation = () => {
    this._setEventListeners();
  }

  disableSubmitBtn() {
    this._buttonForm.classList.add(this._config.inactiveButtonClass);
    this._buttonForm.setAttribute("disabled", "");
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._config.inputSelector));
    this._buttonForm = this._formSelector.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl, this._config);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitBtn();
    }
    else {
      this._buttonForm.classList.remove(this._config.inactiveButtonClass);
      this._buttonForm.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };

    _showInputError = (inputEl, errorMessage) => {
      const errorEl = this._formSelector.querySelector(`.${inputEl.id}-error`);
      errorEl.textContent = errorMessage;
      if (inputEl.validity.patternMismatch) {
        errorEl.textContent = `${errorMessage} Например: https://cat.png`;
      }
      errorEl.classList.add(this._config.errorClass);
    };

    _hideInputError = (inputEl, errorMessage) => {
      const errorEl = this._formSelector.querySelector(`.${inputEl.id}-error`);
      errorEl.textContent = "";
      errorEl.classList.remove(this._config.errorClass);
    };

  _checkInputValidity = (inputEl) => {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    }
    else {
      this._hideInputError(inputEl, inputEl.validationMessage);
    }
  };
}
