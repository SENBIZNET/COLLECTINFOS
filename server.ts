import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // 1. Middlewares de base
  app.use(cors());
  app.use(express.json({ limit: '50mb' })); // Augmenté pour les médias en base64

  // 2. Configuration du pool MySQL
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'vps114316.serveur-vps.net',
    user: process.env.DB_USER || 'c0col0154',
    password: process.env.DB_PASSWORD || 'zr_L)OBHQTggy',
    database: process.env.DB_NAME || 'c0col0154',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 15000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
  });

  // 3. Initialisation de la base de données
  const initDb = async () => {
    let connection;
    try {
      console.log(`🚀 Connecting to database...`);
      connection = await pool.getConnection();
      console.log('✅ Successfully connected to MySQL database');
      
      await connection.query('SET FOREIGN_KEY_CHECKS = 0');

      // Table Users
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role ENUM('JOURNALISTE', 'MEDIAS', 'STAFF', 'ADMIN') NOT NULL,
          status ENUM('PENDING', 'ACTIVE', 'REJECTED', 'BLOCKED') DEFAULT 'PENDING',
          country VARCHAR(100),
          city VARCHAR(100),
          bio TEXT,
          avatar VARCHAR(255),
          balance DECIMAL(10, 2) DEFAULT 0.00,
          pending_payouts DECIMAL(10, 2) DEFAULT 0.00,
          posts_count INT DEFAULT 0,
          followers_count INT DEFAULT 0,
          following_count INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Table Reports
      await connection.query(`
        CREATE TABLE IF NOT EXISTS reports (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          content TEXT,
          price DECIMAL(10, 2) DEFAULT 0.00,
          category VARCHAR(100),
          author_id INT,
          status ENUM('PENDING', 'VALIDATED', 'REJECTED') DEFAULT 'PENDING',
          media_photos LONGTEXT,
          media_videos LONGTEXT,
          media_docs LONGTEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Table Orders
      await connection.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          report_id INT,
          user_id INT,
          status ENUM('PENDING', 'PAID', 'CANCELLED') DEFAULT 'PENDING',
          amount DECIMAL(10, 2),
          reference VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE SET NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await connection.query('SET FOREIGN_KEY_CHECKS = 1');
      
      // Admin par défaut
      await connection.query(`
        INSERT IGNORE INTO users (name, email, password, role, status) 
        VALUES ('Administrateur', 'admin@collectinfos.com', '#Ousma@ne2015#', 'ADMIN', 'ACTIVE')
      `);

      console.log('✅ Database schema verified');
    } catch (err: any) {
      console.error('❌ Database error:', err.message);
    } finally {
      if (connection) connection.release();
    }
  };

  initDb();

  // 4. API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", database: "connected" });
  });

  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password, role, country, city } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO users (name, email, password, role, country, city, status) VALUES (?, ?, ?, ?, ?, ?, 'ACTIVE')",
        [name, email, password, role, country, city]
      );
      res.status(201).json({ id: (result as any).insertId, name, email, role });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const [rows]: any = await pool.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email?.trim().toLowerCase(), password]
      );
      
      if (rows.length > 0) {
        const { password: _, ...user } = rows[0];
        res.json(user);
      } else {
        res.status(401).json({ error: "Identifiants invalides" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/reports", async (req, res) => {
    const { author_id, status } = req.query;
    try {
      let query = "SELECT r.*, u.name as author_name FROM reports r LEFT JOIN users u ON r.author_id = u.id WHERE 1=1";
      const params = [];
      if (status) { query += " AND r.status = ?"; params.push(status); }
      if (author_id) { query += " AND r.author_id = ?"; params.push(author_id); }
      query += " ORDER BY created_at DESC";
      const [rows] = await pool.query(query, params);
      res.json(rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/reports", async (req, res) => {
    const { title, description, content, price, category, author_id, photos, videos, docs } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO reports (title, description, content, price, category, author_id, media_photos, media_videos, media_docs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [title, description, content, price, category, author_id, JSON.stringify(photos), JSON.stringify(videos), JSON.stringify(docs)]
      );
      res.status(201).json({ id: (result as any).insertId });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 5. Gestion des fichiers statiques et Fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Correction du chemin pour Render : dist est à la racine, pas dans src
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    // Fallback pour le routage SPA (React)
    // IMPORTANT : Toujours après les routes API
    app.get('*', (req, res) => {
      // Ne pas renvoyer index.html si la route commence par /api
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: "Route API non trouvée" });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("💥 Failed to start server:", err);
});