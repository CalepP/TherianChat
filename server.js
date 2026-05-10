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

// Servidor HTTP que sirve el index.html
const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) { res.writeHead(404); return res.end("No encontrado"); }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });