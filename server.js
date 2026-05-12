const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const PORT = 3000;
let userCount = 0;

// Crear base de datos
const db = new sqlite3.Database("chat.db");

// Crear tabla si no existe
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

// Enviar mensaje a un solo usuario
function enviar(ws, data) {
  if (ws.readyState === WebSocket.OPEN)
    ws.send(JSON.stringify(data));
}

// Enviar mensaje a todos
function broadcast(data) {
  wss.clients.forEach(c => {
    if (c.readyState === WebSocket.OPEN)
      c.send(JSON.stringify(data));
  });
}

// Lista de usuarios conectados
function usuariosConectados() {
  const lista = [];
  wss.clients.forEach(c => { if (c.username) lista.push(c.username); });
  return lista;
}

// Cuando un usuario se conecta
wss.on("connection", (ws) => {
  ws.username = `Usuario_${++userCount}`;

  // Cargar historial desde la base de datos
  db.all("SELECT * FROM (SELECT * FROM mensajes ORDER BY id DESC LIMIT 50) ORDER BY id ASC",
    (err, filas) => {
      const historial = filas ? filas.map(f => ({ tipo: "mensaje", username: f.username, texto: f.texto, hora: f.hora })) : [];
      enviar(ws, { tipo: "historial", mensajes: historial });
    }
  );

  enviar(ws, { tipo: "bienvenida", username: ws.username });
  broadcast({ tipo: "sistema", texto: `${ws.username} se unió 👋`, usuarios: usuariosConectados() });

  // Cuando un usuario envía un mensaje
  ws.on("message", (raw) => {
    const data = JSON.parse(raw);

    // Cambiar nombre
    if (data.tipo === "renombrar" && data.username?.trim()) {
      const anterior = ws.username;
      ws.username = data.username.trim().slice(0, 20);
      broadcast({ tipo: "sistema", texto: `${anterior} ahora es ${ws.username} ✏️`, usuarios: usuariosConectados() });
      enviar(ws, { tipo: "renombrado", username: ws.username });
    }

    // Guardar y enviar mensaje
    if (data.tipo === "mensaje" && data.texto?.trim()) {
      const msg = {
        tipo: "mensaje",
        username: ws.username,
        texto: data.texto.trim().slice(0, 500),
        hora: new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" }),
      };
      // Guardar en SQLite
      db.run("INSERT INTO mensajes (username, texto, hora) VALUES (?, ?, ?)",
        [msg.username, msg.texto, msg.hora]);
      broadcast(msg);
    }
  });

  // Cuando un usuario se desconecta
  ws.on("close", () => {
    broadcast({ tipo: "sistema", texto: `${ws.username} salió 👋`, usuarios: usuariosConectados() });
  });
});

// Arrancar servidor
server.listen(PORT, () => console.log(`🚀 TherianChat en http://localhost:${PORT}`));
