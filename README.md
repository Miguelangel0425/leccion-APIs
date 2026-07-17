# Lesson APIs

## Descripción

Este proyecto corresponde al desarrollo de una API REST utilizando Node.js y TypeScript. Permite realizar operaciones CRUD mediante distintos métodos HTTP.

---

## Tecnologías utilizadas

- Node.js
- TypeScript
- Docker
- npm

---

# Ejecución local

## Instalar dependencias

```bash
npm install
```

## Compilar TypeScript

```bash
npm run build
```

## Ejecutar el proyecto

```bash
npm start
```

---

# Ejecución con Docker

## Construir la imagen

```bash
docker build -t lesson-apis .
```

## Ejecutar el contenedor

```bash
docker run -d -p 3000:3000 --name lesson-apis lesson-apis
```

Si la aplicación utiliza otro puerto, reemplazar el puerto **3000** por el correspondiente.

---

# Descargar desde Docker Hub

```bash
docker pull m3nm4/lesson-apis:latest
```

Posteriormente ejecutar:

```bash
docker run -d -p 3000:3000 m3nm4/lesson-apis:latest
```

---

# Métodos HTTP utilizados

## GET

Permite consultar información almacenada en el servidor.

Ejemplo:

```http
GET /students
```

Devuelve la lista de estudiantes registrados.

---

## POST

Permite crear un nuevo recurso dentro del servidor.

Ejemplo:

```http
POST /students
```

Se envían los datos del nuevo estudiante en formato JSON y el servidor crea el registro.

---

## PATCH

Permite actualizar parcialmente un recurso existente.

Ejemplo:

```http
PATCH /students/5
```

Solo se modifican los campos enviados en la solicitud.

---

## DELETE

Permite eliminar un recurso del servidor.

Ejemplo:

```http
DELETE /students/5
```

Elimina el estudiante cuyo identificador es 5.

---

# Autor

Estudiante de Ingeniería de Software  
Universidad de las Fuerzas Armadas ESPE