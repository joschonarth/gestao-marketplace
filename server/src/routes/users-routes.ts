import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { login, register } from "../controllers/auth-controller";

const router = Router();

router.post("/login", login); // Rota para login do usuário cadastrado
router.post("/register", register); // Rota para cadastrar um novo usuário

// Rota para obter perfil do usuário autenticado
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Perfil do usuário",
    user: {
      id: req.user?.userId,
      name: req.user?.name,
      email: req.user?.email,
    },
  });
});

export default router;
