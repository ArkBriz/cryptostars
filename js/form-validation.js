const modalForm = document.querySelector('.modal-buy');
const paymentMethodSelect = modalForm.querySelector('[name="paymentMethod"]');
const passwordField = modalForm.querySelector('[name="paymentPassword"]');
const errorMessage = modalForm.querySelector('.modal__validation-message--error');
const successMessage = modalForm.querySelector('.modal__validation-message--success');

const pristine = new Pristine(modalForm, {
  classTo: 'custom-input',
  errorTextParent: 'custom-input',
  errorTextTag: 'div',
  errorTextClass: 'custom-input__error'
});

const validateSelect = () => paymentMethodSelect.selectedIndex > 0;

pristine.addValidator(
  paymentMethodSelect,
  validateSelect,
  'Выберите платежную систему'
);

const validatePassword = (value) => value.trim() !== '';

pristine.addValidator(
  passwordField,
  validatePassword,
  'Введите пароль'
);

const showSubmitStatus = (isValid) => {
  errorMessage.style.display = isValid ? 'none' : 'flex';
  successMessage.style.display = isValid ? 'flex' : 'none';
};

modalForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  showSubmitStatus(isValid);

  if (!isValid) {
    evt.preventDefault();
  }
});
