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
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Configurer le pool de connexion MySQL
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'vps114316.serveur-vps.net',
    user: process.env.DB_USER || 'c0col0154',
    password: process.env.DB_PASSWORD || 'zr_L)OBHQTggy',
    database: process.env.DB_NAME || 'c0col0154',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // 10s
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
    // Désactivation temporaire de SSL pour tester la connectivité pure
  });

  // Tester la connexion au démarrage avec retry
  const initDb = async () => {
    let connection;
    try {
      const dbHost = process.env.DB_HOST || 'vps114316.serveur-vps.net';
      const dbPort = process.env.DB_PORT || '3306';
      console.log(`🚀 Connecting to database at ${dbHost}:${dbPort}...`);
      
      connection = await pool.getConnection();
      console.log('✅ Successfully connected to MySQL database');
      
      // Désactiver temporairement les clés étrangères pour la création
      await connection.query('SET FOREIGN_KEY_CHECKS = 0');

      console.log('🛠 Creating tables if they don\'t exist...');

      // Créer les tables de base si elles n'existent pas
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

      // S'assurer que les champs existent si la table existait déjà
      const columnsToAdd = [
        "ALTER TABLE users ADD COLUMN status ENUM('PENDING', 'ACTIVE', 'REJECTED', 'BLOCKED') DEFAULT 'PENDING' AFTER role",
        "ALTER TABLE users ADD COLUMN bio TEXT AFTER city",
        "ALTER TABLE users ADD COLUMN avatar VARCHAR(255) AFTER bio",
        "ALTER TABLE users ADD COLUMN balance DECIMAL(10, 2) DEFAULT 0.00 AFTER avatar",
        "ALTER TABLE users ADD COLUMN pending_payouts DECIMAL(10, 2) DEFAULT 0.00 AFTER balance",
        "ALTER TABLE users ADD COLUMN posts_count INT DEFAULT 0 AFTER pending_payouts",
        "ALTER TABLE users ADD COLUMN followers_count INT DEFAULT 0 AFTER posts_count",
        "ALTER TABLE users ADD COLUMN following_count INT DEFAULT 0 AFTER followers_count"
      ];

      for (const sql of columnsToAdd) {
        try {
          await connection.query(sql);
        } catch (e) {
          // Le champ existe probablement déjà
        }
      }

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
          media_photos TEXT,
          media_videos TEXT,
          media_docs TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // S'assurer que les nouveaux champs existent si la table existait déjà
      const reportColumnsToAdd = [
        "ALTER TABLE reports ADD COLUMN content TEXT AFTER description",
        "ALTER TABLE reports ADD COLUMN media_photos TEXT AFTER status",
        "ALTER TABLE reports ADD COLUMN media_videos TEXT AFTER media_photos",
        "ALTER TABLE reports ADD COLUMN media_docs TEXT AFTER media_videos"
      ];

      for (const sql of reportColumnsToAdd) {
        try {
          await connection.query(sql);
        } catch (e) {
          // Le champ existe probablement déjà
        }
      }

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

      // Réactiver les clés étrangères
      await connection.query('SET FOREIGN_KEY_CHECKS = 1');
      
      // S'assurer que le compte administrateur par défaut existe
      const [existingAdmins]: any = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@collectinfos.com']);
      if (existingAdmins.length === 0) {
        console.log('👤 Creating default admin account...');
        await connection.query(`
          INSERT INTO users (name, email, password, role, status) 
          VALUES (?, ?, ?, ?, ?)
        `, ['Administrateur', 'admin@collectinfos.com', '#Ousma@ne2015#', 'ADMIN', 'ACTIVE']);
        console.log('✅ Default admin account created: admin@collectinfos.com / #Ousma@ne2015#');
      } else {
        // Forcer la mise à jour du mot de passe et du statut pour l'admin
        await connection.query('UPDATE users SET password = ?, role = ?, status = ? WHERE email = ?', ['#Ousma@ne2015#', 'ADMIN', 'ACTIVE', 'admin@collectinfos.com']);
        console.log('✅ Admin account (admin@collectinfos.com) verified and password reset to default');
      }

      // S'assurer que le deuxième compte administrateur existe
      const [existingAdmins2]: any = await connection.query('SELECT * FROM users WHERE email = ?', ['mmsouare@collectinfos.com']);
      if (existingAdmins2.length === 0) {
        console.log('👤 Creating second admin account...');
        await connection.query(`
          INSERT INTO users (name, email, password, role, status) 
          VALUES (?, ?, ?, ?, ?)
        `, ['MM Souare', 'mmsouare@collectinfos.com', 'Aissatousouare090924', 'ADMIN', 'ACTIVE']);
        console.log('✅ Second admin account created: mmsouare@collectinfos.com / Aissatousouare090924');
      } else {
        await connection.query('UPDATE users SET password = ?, role = ?, status = ? WHERE email = ?', ['Aissatousouare090924', 'ADMIN', 'ACTIVE', 'mmsouare@collectinfos.com']);
        console.log('✅ Second admin account verified and password updated');
      }

      console.log('✅ Database schema verified and tables are ready');
      
    } catch (err) {
      const error = err as Error;
      console.error('❌ CRITICAL: Error initializing database:', error.message);
      
      if (error.message.includes('not allowed to connect')) {
        console.warn('---------------------------------------------------------');
        console.warn('⚠️  ERREUR DE PERMISSION MARIADB/MYSQL :');
        console.warn('Le serveur MariaDB rejette la connexion car l\'hôte n\'est pas autorisé.');
        console.warn('L\'IP de cet environnement est : ' + (error.message.match(/'([^']+)'/)?.[1] || 'détectée par MariaDB'));
        console.warn('');
        console.warn('Solution à exécuter sur votre VPS (via SSH) :');
        console.warn('1. Connectez-vous à MySQL : "mysql -u root -p"');
        console.warn('2. Exécutez ces commandes :');
        console.warn('   GRANT ALL PRIVILEGES ON c0col0154.* TO \'c0col0154\'@\'%\' IDENTIFIED BY \'zr_L)OBHQTggy\';');
        console.warn('   FLUSH PRIVILEGES;');
        console.warn('---------------------------------------------------------');
      } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED')) {
        console.warn('---------------------------------------------------------');
        console.warn('⚠️  CONSEIL DE CONFIGURATION POUR VOTRE VPS :');
        console.warn('La connexion a échoué (Timeout). Cela arrive généralement quand :');
        console.warn('1. Le port 3306 est bloqué par le pare-feu du VPS.');
        console.warn('2. MySQL n\'écoute que sur localhost (127.0.0.1).');
        console.warn('');
        console.warn('Solutions à tester sur votre VPS :');
        console.warn('- Commande pour ouvrir le port : "sudo ufw allow 3306/tcp" ou équivalent.');
        console.warn('- Modifiez /etc/mysql/mariadb.conf.d/50-server.cnf : changez "bind-address = 127.0.0.1" en "0.0.0.0".');
        console.warn('- Assurez-vous que l\'utilisateur c0col0154 peut se connecter via "%" (remote) et non seulement depuis "localhost".');
        console.warn('---------------------------------------------------------');
      }
    } finally {
      if (connection) connection.release();
    }
  };

  initDb();

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", database: "connected" });
  });

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password, role, country, city } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO users (name, email, password, role, country, city, status, balance, pending_payouts, posts_count, followers_count, following_count) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0)",
        [name, email, password, role, country, city, 'ACTIVE']
      );
      
      const newUser = {
        id: (result as any).insertId,
        name,
        email,
        role,
        status: 'ACTIVE',
        country,
        city,
        balance: 0,
        pending_payouts: 0,
        posts_count: 0,
        followers_count: 0,
        following_count: 0,
        wallet: { balance: 0, pendingPayouts: 0 },
        stats: { posts: 0, followers: 0, following: 0 }
      };

      res.status(201).json(newUser);
    } catch (err) {
      console.error('❌ Register error:', err);
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();
    
    console.log(`🔑 Login attempt for: ${cleanEmail}`);
    try {
      const [rows]: any = await pool.query(
        "SELECT * FROM users WHERE LOWER(email) = ? AND password = ?",
        [cleanEmail, cleanPassword]
      );
      
      if (rows.length > 0) {
        console.log(`✅ Login successful: ${email}`);
        const user = rows[0];
        // Ne jamais renvoyer le mot de passe au client
        const { password: _, ...userWithoutPassword } = user;
        
        // Formater pour le frontend
        const formattedUser = {
          ...userWithoutPassword,
          wallet: {
            balance: Number(user.balance || 0),
            pendingPayouts: Number(user.pending_payouts || 0)
          },
          stats: {
            posts: Number(user.posts_count || 0),
            followers: Number(user.followers_count || 0),
            following: Number(user.following_count || 0)
          }
        };
        
        res.json(formattedUser);
      } else {
        console.warn(`❌ Login failed (Invalid credentials): ${cleanEmail}`);
        res.status(401).json({ error: "Identifiants invalides" });
      }
    } catch (err) {
      console.error(`❌ Login server error: ${(err as Error).message}`);
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Reports Routes
  app.get("/api/reports", async (req, res) => {
    const { author_id, status } = req.query;
    try {
      let query = `
        SELECT r.*, u.name as author_name, u.avatar as author_avatar
        FROM reports r 
        LEFT JOIN users u ON r.author_id = u.id 
        WHERE 1=1
      `;
      const params = [];

      if (status) {
        query += " AND r.status = ?";
        params.push(status);
      } else if (!author_id) {
        // By default only show validated reports if no specific author is requested
        query += " AND r.status = 'VALIDATED'";
      }

      if (author_id) {
        query += " AND r.author_id = ?";
        params.push(author_id);
      }

      query += " ORDER BY r.created_at DESC";

      const [rows] = await pool.query(query, params);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const [[usersCount]] = await pool.query("SELECT COUNT(*) as count FROM users") as any;
      const [[pendingCount]] = await pool.query("SELECT COUNT(*) as count FROM reports WHERE status = 'PENDING'") as any;
      const [[salesCount]] = await pool.query("SELECT SUM(amount) as sum FROM orders WHERE status = 'PAID'") as any;
      
      res.json({
        users: usersCount.count,
        pendingReports: pendingCount.count,
        monthlySales: salesCount.sum || 0,
        alerts: 0
      });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.put("/api/reports/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, content, price, category, photos, videos, docs } = req.body;
    try {
      await pool.query(
        "UPDATE reports SET title = ?, description = ?, content = ?, price = ?, category = ?, media_photos = ?, media_videos = ?, media_docs = ? WHERE id = ?",
        [
          title, 
          description || '', 
          content || '', 
          price || 0, 
          category || 'Général', 
          photos ? JSON.stringify(photos) : null,
          videos ? JSON.stringify(videos) : null,
          docs ? JSON.stringify(docs) : null,
          id
        ]
      );
      res.json({ message: "Report updated successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.put("/api/reports/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await pool.query("UPDATE reports SET status = ? WHERE id = ?", [status, id]);
      res.json({ message: "Status updated successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.post("/api/reports", async (req, res) => {
    const { title, description, content, price, category, author_id, photos, videos, docs } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO reports (title, description, content, price, category, author_id, media_photos, media_videos, media_docs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          title, 
          description || '', 
          content || '', 
          price || 0, 
          category || 'Général', 
          author_id,
          photos ? JSON.stringify(photos) : null,
          videos ? JSON.stringify(videos) : null,
          docs ? JSON.stringify(docs) : null
        ]
      );
      
      // Increment user post count
      if (author_id) {
        await pool.query("UPDATE users SET posts_count = posts_count + 1 WHERE id = ?", [author_id]);
      }
      
      res.status(201).json({ id: (result as any).insertId });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Orders Routes
  app.post("/api/orders", async (req, res) => {
    const { report_id, user_id, amount, reference } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO orders (report_id, user_id, amount, reference) VALUES (?, ?, ?, ?)",
        [report_id, user_id, amount, reference]
      );
      res.status(201).json({ id: (result as any).insertId });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      const [rows]: any = await pool.query("SELECT * FROM users");
      const formattedUsers = rows.map((user: any) => ({
        ...user,
        password: undefined, // Securité
        wallet: {
          balance: Number(user.balance || 0),
          pendingPayouts: Number(user.pending_payouts || 0)
        },
        stats: {
          posts: Number(user.posts_count || 0),
          followers: Number(user.followers_count || 0),
          following: Number(user.following_count || 0)
        }
      }));
      res.json(formattedUsers);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Admin: Update user status
  app.put("/api/admin/users/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      // Récupérer les infos de l'utilisateur avant la mise à jour pour l'email
      const [users]: any = await pool.query("SELECT email, name, status as oldStatus FROM users WHERE id = ?", [id]);
      
      if (users.length > 0) {
        const user = users[0];
        await pool.query("UPDATE users SET status = ? WHERE id = ?", [status, id]);
        
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Admin: Reset systems (truncate orders and reports)
  app.post("/api/admin/reset-system", async (req, res) => {
    try {
      await pool.query("SET FOREIGN_KEY_CHECKS = 0");
      await pool.query("TRUNCATE TABLE orders");
      await pool.query("TRUNCATE TABLE reports");
      await pool.query("SET FOREIGN_KEY_CHECKS = 1");
      res.json({ success: true, message: "Système réinitialisé avec succès" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Admin: Delete user
  app.delete("/api/admin/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("SET FOREIGN_KEY_CHECKS = 0");
      await pool.query("DELETE FROM users WHERE id = ?", [id]);
      await pool.query("SET FOREIGN_KEY_CHECKS = 1");
      res.json({ success: true, message: "Utilisateur supprimé" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Admin: Update own password
  app.put("/api/admin/update-password", async (req, res) => {
    const { email, newPassword } = req.body;
    try {
      await pool.query("UPDATE users SET password = ? WHERE email = ? AND role = 'ADMIN'", [newPassword, email]);
      res.json({ success: true, message: "Mot de passe mis à jour" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Catch-all for API routes to prevent falling through to SPA fallback (returning HTML)
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API route not found: ${req.method} ${req.url}` });
  });

  // Error handler to ensure JSON responses on errors
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('💥 Server Error:', err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  });

  // Middleware pour développement
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
