//3. Validación de formulario

// Creación del formulario
const form = document.querySelector("form");


// Funcion que le da estilo a los errores 
const mostrarError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

const handleFormData = (e) => {
    e.preventDefault();

    // Recibir elementos del HTML
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const dateInput = document.getElementById("date");
    const genderInput = document.getElementById("gender");

    // quitar cualquier espacio en blanco
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const date = dateInput.value;
    const gender = genderInput.value;

    // Expresion regular para validar el correo
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Cada que se le da submit, se elimina el mensaje de error
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Las valida
    if (fullname === "") {
        mostrarError(fullnameInput, "Escribe el nombre completo ");
    }
    if (!emailPattern.test(email)) {
        mostrarError(emailInput, "Escribe un correo valido");
    }
    if (password === "") {
        mostrarError(passwordInput, "Escribe la contraseña");
    }
    if (date === "") {
        mostrarError(dateInput, "Selecciona una fecha de nacimiento");
    }
    if (gender === "") {
        mostrarError(genderInput, "Selecciona un genero");
    }

    // mirar que no haya ningun mensaje de error para mostrar valores en pantalla
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length === 0) {
        // Guardar datos en localStorage y sessionStorage
        const data = {
            fullname,
            email,
            password,
            date,
            gender
        };

        let oldData = JSON.parse(localStorage.getItem('formData'));
        if (!Array.isArray(oldData)) {
            oldData = [];
        }
        oldData.push(data);
        localStorage.setItem('formData', JSON.stringify(oldData));

        let oldDataSessionStorage = JSON.parse(sessionStorage.getItem('formData'));
        if (!Array.isArray(oldDataSessionStorage)) {
            oldDataSessionStorage = [];
        }
        oldDataSessionStorage.push(data);
        sessionStorage.setItem('formData', JSON.stringify(oldDataSessionStorage));

        // Limpiar los campos del formulario
        fullnameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        dateInput.value = '';
        genderInput.value = '';
        return
    };
}

form.addEventListener("submit", handleFormData);

// Función que devuelve una promesa que se resuelve con datos simulados
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                fullname: 'Jimena',
                email: 'jimena@gmail.com',
                password: 'password123',
                date: '1990-01-01',
                gender: 'Male'
            });
        }, 5000); // Simula un retraso de 2 segundos
    });
}

// Función para manejar la resolución de la promesa y mostrar los datos

// Función para manejar la resolución de la promesa y mostrar los datos
const displayData = () => {
    fetchData().then(data => {
        const tableElement = document.getElementById('results-table-1');
        const row = tableElement.insertRow();
        const fullnameCell = row.insertCell();
        const emailCell = row.insertCell();
        const passwordCell = row.insertCell();
        const dateCell = row.insertCell();
        const genderCell = row.insertCell();
        fullnameCell.textContent = data.fullname;
        emailCell.textContent = data.email;
        passwordCell.textContent = data.password;
        dateCell.textContent = data.date;
        genderCell.textContent = data.gender;
    });
}

// Llama a la función displayData para iniciar la operación asincrónica
displayData();


// Realizar una solicitud GET
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        const tableElement = document.getElementById('results-table');
        data.forEach(user => {
            const row = tableElement.insertRow();
            const nameCell = row.insertCell();
            const emailCell = row.insertCell();
            const dateCell = row.insertCell(); // Agrega una celda para la fecha de nacimiento
            const genderCell = row.insertCell(); // Agrega una celda para el género
            nameCell.textContent = user.name;
            emailCell.textContent = user.email;
            dateCell.textContent = user.date; // Establece el contenido de la celda de la fecha de nacimiento
            genderCell.textContent = user.gender; // Establece el contenido de la celda del género
        });
    })
    .catch(error => console.error('Error:', error));