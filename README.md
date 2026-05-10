[README.md](https://github.com/user-attachments/files/27571402/README.md)
# 💬 TherianChat

> 🔗 Sistema de Chat Colaborativo en tiempo real · Comunicación instantánea y simultánea entre múltiples usuarios · Sistemas Colaborativos 🎓

---

## 📌 Descripción General

**TherianChat** es una aplicación web de chat colaborativo en tiempo real desarrollada para la materia de **Sistemas Colaborativos**.

Permite a los usuarios:

- 💬 Enviar y recibir mensajes instantáneos sin recargar la página
- 👤 Conectarse con un nombre de usuario asignado automáticamente
- ✏️ Cambiar su nombre de usuario desde la interfaz
- 📜 Ver el historial de los últimos 50 mensajes al conectarse
- 🔔 Recibir notificaciones cuando alguien entra o sale del chat
- 👥 Ver en tiempo real quién está conectado

El sistema usa **WebSocket** como único medio de comunicación, garantizando mensajería bidireccional persistente sin polling.

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura simple de dos capas:

- **Cliente** → Aplicación Web (SPA) en HTML + CSS + JavaScript puro
- **Servidor** → Node.js con WebSocket y base de datos SQLite

```
Cliente (index.html)
      ↕ WebSocket (ws://)
Servidor (server.js)
      ↕ SQL
Base de datos (chat.db)
```

---

## 🛠️ Tecnologías

| Capa | Tecnología | Uso |
|---|---|---|
| Servidor | Node.js | Lógica del servidor |
| Comunicación | WebSocket (ws) | Mensajería en tiempo real |
| Base de datos | SQLite3 | Persistencia del historial |
| Cliente | HTML + CSS + JS | Interfaz web (SPA) |

---

## 📁 Estructura del Proyecto

```
TherianChat/
├── server.js        # Servidor WebSocket + HTTP + Base de datos
├── index.html       # Cliente web (SPA)
├── package.json     # Dependencias del proyecto
├── .gitignore       # Archivos ignorados por git
└── README.md        # Documentación
```

---

## ⚙️ Funcionalidades

### Servidor (`server.js`)
- Maneja múltiples conexiones WebSocket simultáneas
- Asigna nombre automático `Usuario_1`, `Usuario_2`, etc.
- Notifica a todos cuando alguien entra o sale
- Guarda cada mensaje en SQLite
- Carga el historial de los últimos 50 mensajes al conectarse

### Cliente (`index.html`)
- Interfaz de chat con burbujas de mensajes
- Panel lateral con lista de usuarios conectados
- Campo para cambiar el nombre de usuario
- Reconexión automática si se pierde la conexión
- Envío de mensajes con Enter o botón

---

## 🗄️ Base de Datos

Se usa **SQLite** como base de datos local. No requiere instalación de un servidor externo. Al ejecutar el proyecto por primera vez se crea automáticamente el archivo `chat.db`.

**Tabla `mensajes`:**

| Campo | Tipo | Descripción |
|---|---|---|
| id | INTEGER | Identificador automático |
| username | TEXT | Nombre del usuario |
| texto | TEXT | Contenido del mensaje |
| hora | TEXT | Hora de envío |

---

## 🚀 Instalación y Ejecución

### Requisitos
- Tener instalado [Node.js](https://nodejs.org) versión 14 o superior

### Pasos

**1. Clonar el repositorio**
```bash
git clone https://github.com/CalepP/TherianChat.git
cd TherianChat
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Iniciar el servidor**
```bash
node server.js
```

**4. Abrir en el navegador**
```
http://localhost:3000
```

> Para probar con múltiples usuarios abre varias pestañas en la misma URL.

---

## 👥 Equipo

| Integrante | Contribución |
|---|---|
| Nombre 1 | Servidor base + configuración inicial |
| Nombre 2 | Funciones broadcast y lista de usuarios |
| Nombre 3 | Evento de conexión e historial |
| Nombre 4 | Evento de mensajes + guardado en SQLite |
| Nombre 5 | Evento de desconexión + arranque del servidor |
| Nombre 6 | Interfaz HTML y estilos CSS |
| Nombre 7 | Lógica WebSocket del cliente + README |

---

## 📋 Tablero Trello

🔗 [Ver tablero del Sprint](https://trello.com/aqui-el-link)

---

## 🎓 Materia: Sistemas Colaborativos
