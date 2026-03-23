import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

// A SECRET deve ser a mesma que você usou para gerar o token no login
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    // 1. Pegar o token do header 'Authorization'
    // Geralmente vem no formato: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Se não houver token, barramos o acesso
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // 3. Verificar e decodificar o token
        const verified = jwt.verify(token, JWT_SECRET);

        // 4. Salvar os dados do usuário (ex: id) dentro da requisição
        // Isso permite que o Controller saiba QUEM está logado
        req.user = verified;

        // 5. Deixar a requisição prosseguir para a próxima função (o Controller)
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};

export default auth;