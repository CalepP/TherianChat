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

// ── KENDRY ARDAYA ────────────────────────────────── 
  // Cuando un usuario envia un mensaje 
  ws.on('message', (raw) => { 
    const data = JSON.parse(raw); 
 
    // Cambiar nombre de usuario 
    if (data.tipo === 'renombrar' && data.username?.trim()) { 
      const anterior = ws.username; 
      ws.username = data.username.trim().slice(0, 20); 
      broadcast({ tipo: 'sistema', 
        texto: `${anterior} ahora es ${ws.username} ✏`, 
        usuarios: usuariosConectados() }); 
      enviar(ws, { tipo: 'renombrado', username: ws.username }); 
    } 
 
    // Guardar y transmitir mensaje de chat 
    if (data.tipo === 'mensaje' && data.texto?.trim()) { 
      const msg = { 
        tipo: 'mensaje', 
        username: ws.username, 
        texto: data.texto.trim().slice(0, 500), 
        hora: new Date().toLocaleTimeString('es-BO', 
          { hour: '2-digit', minute: '2-digit' }), 
}; 
// Guardar en base de datos SQLite 
db.run('INSERT INTO mensajes (username, texto, hora) VALUES (?, ?, ?)', 
[msg.username, msg.texto, msg.hora]); 
broadcast(msg); 
} 
}); 
