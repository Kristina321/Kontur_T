/**
 * Валидирует форму с использованием библиотеки JustValidate
 * Настраивает правила валидации для полей формы и обработчик проверки
 */
export function validateForm(form) {
  const nameRegex = /^(?!.*[a-z].*[а-яё]|.*[а-яё].*[a-z])([a-zа-яё]{2,}(?:[\- ][a-zа-яё]{2,})?)(?:\s([a-zа-яё]{2,}(?:[\- ][a-zа-яё]{2,})?))?(?:\s([a-zа-яё]{2,}))?$/i;
  const telRadex = /^\+?(?:\s*\d){7,20}$/;
  const submitButtonEl = form.querySelector(`button[type='submit']`);
  let isFormTouched = false;

  const validator = new JustValidate(form, {
    validateBeforeSubmitting: true,
    focusInvalidField: true,
  });
  validator
    .addField(document.querySelector('#input-name'), [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'customRegexp',
        value: nameRegex,
        errorMessage: 'Неверный формат имени',
      },
    ], {
      errorsContainer: '#error-name',
    })
    .addField(document.querySelector('#input-tel'), [
      {
        rule: 'required',
        errorMessage: 'Введите номер телефона',
      },
      {
        rule: 'customRegexp',
        value: telRadex,
        errorMessage: 'Неверный формат.\nПример: +71234567890 или 7 123 456 78 90',
      },
    ], {
      errorsContainer: '#error-tel',
    })
    .addField(document.querySelector('#input-email'), [
      {
        rule: 'required',
        errorMessage: 'Введите электронную почту',
      },
      {
        rule: 'email',
        errorMessage: 'Неверный формат.\nПример: mail@site.com'
      },
    ], {
      errorsContainer: '#error-email',
    })
}
