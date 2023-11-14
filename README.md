# Modulo_Comunicacion_con_servidor
En este módulo nos adentramos a temas más complejos tal como se manejan los datos en navegador y temas de servidores.

## localStore vs sessionStorage

Cuando hablamos de **localStorage** y **sessionStorage** son dos mecanismos de almacenamiento en el navegador. **localStorage** permite almacenar datos de forma persistente en el dispositivo del usuario, incluso después de cerrar la ventana del navegador. **sessionStorage**, por otro lado, almacena datos solo durante la sesión actual del navegador y se borra cuando se cierra la pestaña o ventana.

### Las diferencias clave son:
   - **Alcance**: **localStorage** es compartido entre todas las pestañas y ventanas del mismo dominio, mientras que **sessionStorage** es específico para una sola pestaña o ventana.
   - **Persistencia**: **localStorage** es persistente, mientras que **sessionStorage** es temporal.
   - **Capacidad**: **localStorage** tiene más capacidad de almacenamiento que **sessionStorage**.

#### Utilidades
Son útiles para almacenar datos como configuraciones de usuario, tokens de autenticación o preferencias. El límite de capacidad varía según el navegador, pero generalmente es de alrededor de 5-10 MB para **localStorage** y menos para **sessionStorage**.

## Promesas en JavaScript
Las **promesas** son objetos que representan valores que pueden estar disponibles ahora, en el futuro o nunca. Se utilizan para manejar operaciones asíncronas, como solicitudes HTTP o acceso a bases de datos. Ayudan a evitar el anidamiento excesivo de callbacks y mejoran la legibilidad del código.

## Asincronismo en JavaScript
La **asincronía** en resumidas palabras, se refiere a la ejecución de tareas sin bloquear el hilo principal del navegador. Permite que otras operaciones continúen mientras se realizan tareas como solicitudes de red o lectura de archivos. Las promesas y async/await son herramientas comunes para trabajar con código asíncrono.

**Ejemplo de uso de una promesa para una solicitud de red**:

Supongamos que queremos hacer una solicitud HTTP GET a una API utilizando JavaScript, que esa es una petición muy típica en una página web. Podemos usar una promesa para manejar la respuesta asíncrona. Aquí está un ejemplo:

   ```javascript
   function fetchData() {
     return new Promise((resolve, reject) => {
       fetch('https://api.example.com/data')
         .then(response => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
         })
         .then(data => resolve(data))
         .catch(error => reject(error));
     });
   }

   // Uso de la promesa
   fetchData()
     .then(data => console.log('Datos recibidos:', data))
     .catch(error => console.error('Error al obtener datos:', error));
   ```

Aquí un paso a paso más detallado:

1. **Función `fetchData()`**:
   - Creamos una función llamada `fetchData()`.
   - Esta función devuelve una **promesa** que manejará la solicitud de red asíncrona.
   - La promesa toma dos argumentos: `resolve` y `reject`, que se utilizan para manejar el éxito o el error de la operación.

2. **Solicitud HTTP GET**:
   - Dentro de `fetchData()`, usamos `fetch('https://api.example.com/data')` para hacer una solicitud HTTP GET a una API ficticia (reemplaza la URL con una real).
   - Si la respuesta no es exitosa (por ejemplo, un código de estado diferente a 200), lanzamos un error con `throw new Error('Network response was not ok')`.

3. **Manejo de la respuesta**:
   - Si la respuesta es exitosa, convertimos los datos en formato JSON con `.json()`.
   - Luego, resolvemos la promesa con los datos utilizando `resolve(data)`.

4. **Manejo de errores**:
   - Si ocurre algún error durante la solicitud o el procesamiento de datos, lo capturamos con `.catch(error)`.
   - En este caso, rechazamos la promesa con el error utilizando `reject(error)`.

5. **Uso de la promesa**:
   - Fuera de la función, llamamos a `fetchData()`.
   - Usamos `.then(data => ...)` para manejar los datos recibidos y `.catch(error => ...)` para manejar errores.
   - Puedes personalizar las acciones dentro de estos bloques según tus necesidades específicas.

### Diferencias clave entre .then().catch() y async/await:
   - **.then().catch()**:
     - Utiliza cadenas de promesas encadenadas.
     - Requiere manejar errores explícitamente con `.catch()`.
   - **async/await**:
     - Utiliza palabras clave `async` y `await`.
     - Proporciona una sintaxis más legible y similar a código síncrono.
     - Los errores se manejan con bloques `try/catch`.

## JSON Server
**JSON Server** es una herramienta que nos permite crear una API REST falsa utilizando un archivo JSON como base de datos. Es útil en el desarrollo frontend para simular una API real antes de que esté completamente implementada. Esto nos permite probar y desarrollar la interfaz de usuario sin depender de un backend completamente funcional.

**Ejemplo de configuración de una API falsa con JSON Server**:
    - Instala JSON Server: `npm install -g json-server`
    - Crea un archivo JSON llamado `db.json` con datos ficticios.
    - Ejecuta JSON Server: `json-server --watch db.json`
    - Realiza solicitudes HTTP (GET, POST, PUT, PATCH, DELETE) a `http://localhost:3000`.


### Diferencias entre Fetch y Axios:
Fetch y axios sirven especificamente para manejar las promesas en javascript, sin embargo hay grande diferencias entre estas
    - **Fetch**:
        - Es una API nativa de JavaScript para realizar solicitudes HTTP.
        - Devuelve una promesa que maneja respuestas HTTP.
        - Requiere más código para manejar errores y transformar datos.
    - **Axios**:
        - Es una librería externa.
        - Proporciona una interfaz más sencilla y potente.
        - Maneja automáticamente errores y transforma datos.

## Importancia de las peticiones HTTP en aplicaciones web modernas:
    - Las peticiones HTTP son fundamentales para obtener y enviar datos entre el cliente (navegador) y el servidor.
    - Permiten cargar recursos, autenticar usuarios, enviar formularios y más.
    - Son esenciales para la interacción dinámica en aplicaciones web.

**Ejemplos de Fetch y Axios para solicitudes GET y POST**:
    - **Fetch (GET)**:
        ```javascript
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
        ```
    - **Axios (POST)**:
        ```javascript
        axios.post('https://api.example.com/user', { name: 'John' })
          .then(response => console.log(response.data))
          .catch(error => console.error(error));
        ```

## Y... ¿Porqué hacer el manejo de errores con promesas?:
    - Evita que los errores se propaguen y rompan la aplicación.
    - Permite manejar errores de red, datos inválidos, etc.
    - Mejora la robustez y confiabilidad del código.

### Manejo de errores en promesas con catch:
    - El método `.catch()` captura errores en cualquier parte de la cadena de promesas.
    - Se ejecuta cuando la promesa es rechazada.
    - Permite manejar errores de manera centralizada.

Aquí un ejemplo de cómo manejar un error en una promesa al realizar una solicitud de red utilizando **Fetch**:

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('Datos recibidos:', data))
  .catch(error => console.error('Error al obtener datos:', error));
```

En este ejemplo:
- Hacemos una solicitud HTTP GET a `https://api.example.com/data`.
- Si la respuesta no es exitosa (por ejemplo, un código de estado diferente a 200), lanzamos un error con `throw new Error('Network response was not ok')`.
- El bloque `.catch(error => ...)` captura cualquier error que ocurra durante la solicitud o el procesamiento de datos.

Recuerda personalizar la URL y las acciones dentro de los bloques `.then()` y `.catch()` según tus necesidades específicas. ¡Espero que esto te ayude a comprender cómo manejar errores en promesas! 😊


