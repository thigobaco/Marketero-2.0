import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  console.log("--- STARTING SERVER ---");
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = Number(process.env.PORT) || 3000;

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV,
      time: new Date().toISOString()
    });
  });

  // Simple test route
  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  // Socket.io connection
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Mode: DEVELOPMENT");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite middleware attached.");
    } catch (e) {
      console.error("Vite failed to start, falling back to static:", e);
      serveStatic(app);
    }
  } else {
    console.log("Mode: PRODUCTION");
    serveStatic(app);
  }

  function serveStatic(expressApp: express.Express) {
    const distPath = path.resolve(__dirname, "dist");
    console.log("Serving static from:", distPath);
    
    if (fs.existsSync(distPath)) {
      expressApp.use(express.static(distPath));
      expressApp.get("*", (req, res) => {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send("index.html not found");
        }
      });
      console.log("Static routes configured.");
    } else {
      console.error("DIST folder missing!");
      expressApp.get("*", (req, res) => {
        res.status(500).send("Application not built. Please run build.");
      });
    }
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  }).on('error', (err) => {
    console.error('CRITICAL: Server failed to listen:', err);
  });
}

startServer().catch((err) => {
  console.error("CRITICAL: Failed to start server:", err);
});
