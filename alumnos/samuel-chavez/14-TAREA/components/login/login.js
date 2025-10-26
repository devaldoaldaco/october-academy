const defaultUser = {
  email: "chavezzsam@gmail.com",
  password: "12345678",
};

const btn = document.querySelector("login-btn");

btn.addEventListener("login-event", () => {
  const fields = document.querySelectorAll("user-field");
  const email = fields[0].value;
  const password = fields[1].value;
  
  if (validates(email, password)) {
    window.location.href = "../../index.html";
  }
});

function validates(email, password) {
  const userDefault = {
    email: "chavezzsam@gmail.com",
    password: "12345678",
  };
  if (!email || !password) {
    alert("Todos los campos son obligatorios.");
    return false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return false;
  }

  if (password.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    return false;
  }

  if (email !== userDefault.email || password !== userDefault.password) {
    alert("Usuario o contraseña incorrectos.");
    return false;
  }

  return true;
}
