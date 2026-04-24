import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role for sensitive admin checks
);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- ADMIN MIDDLEWARE ---
  const requireAdmin = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    
    try {
      // 1. Validate JWT with Supabase
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user) throw new Error("Invalid token");

      // 2. Check Role in DB (Strict Backend Validation)
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const userRole = profile?.role?.toLowerCase();
      if (!profile || userRole !== "admin") {
        console.warn(`[Admin-API] Blocked user ${user.id} with role: ${profile?.role}`);
        return res.status(403).json({ error: "Access denied: Admins only" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };

  // --- PROTECTED ADMIN API ROUTES ---
  
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    const { data: users, error } = await supabase.from("profiles").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(users);
  });

  app.post("/api/admin/verify-winner", requireAdmin, async (req, res) => {
    const { winnerId, status } = req.body;
    // Logic for winner verification
    res.json({ message: `Winner ${winnerId} status updated to ${status}` });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Production-grade server running on http://localhost:${PORT}`);
  });
}

startServer();
