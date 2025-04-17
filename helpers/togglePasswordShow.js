
const togglePasswordShow = (e) => {
  const passText = document.querySelector('#password');

  if (passText.type == "password") {
    passText.type = 'text';
    e.currentTarget.classList.add('show');
  } else {
    passText.type = 'password';
    e.currentTarget.classList.remove('show');
  }
}

export default togglePasswordShow;