export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);    
  }

  _addFormListeners() {
    this._form.addEventListener('input', () => this._setSubmitButtonState());
    this._inputs.forEach(input => {
      this._hideError(input);
      input.addEventListener('input', () => this._handleFieldValidity(input));
    });
    this._setSubmitButtonState();
  };

  _setSubmitButtonState() {
    this._button.disabled = !this._form.checkValidity();
    this._button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity());
  };

  _showError(input) {
    input.classList.add(this._config.inputErrorClass);
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideError(input) {
    input.classList.remove(this._config.inputErrorClass);
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  };

  _handleFieldValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
        this._showError(input);
    };
  };

  enableValidation() {
    this._addFormListeners();
  };
};