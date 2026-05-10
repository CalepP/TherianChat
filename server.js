// Importaciones y configuración inicial
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const PORT = 3000;
let userCount = 0;

// Crear base de datos (se crea chat.db automáticamente)
const db = new sqlite3.Database("chat.db");

// Crear tabla de mensajes si no existe
db.run(`CREATE TABLE IF NOT EXISTS mensajes (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  texto    TEXT,
  hora     TEXT
)`);

