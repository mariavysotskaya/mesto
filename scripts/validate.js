function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
};

function showError(form, input, config) {
  input.classList.add(config.inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
};

function hideError(form, input, config) {
  input.classList.remove(config.inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

function handleFieldValidity(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config)
  } else {
      showError(form, input, config)
  };
};

function addFormListeners(form, config) {
  form.addEventListener('input', () => setSubmitButtonState(form, config));
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach(input => {
    hideError(form, input, config);
    input.addEventListener('input', () => handleFieldValidity(form, input, config));
  });
  setSubmitButtonState(form, config);
};

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => addFormListeners(form, config));
};