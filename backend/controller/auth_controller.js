import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) return res.status(404).json({ message: 'User not found' });

            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass) return res.status(401).json({ message: 'Invalid credentials' });

            const { password: _, ...userData } = user;
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.json({ user: userData, token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: "Server error" });
        }
    }

    async authToken(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'Access denied' });

            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, email: true, name: true, surname: true }
            });

            if (!user) return res.status(404).json({ message: 'User not found' });

            req.user = user;
            next();
        } catch (error) {
            console.error('Auth error:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    }

    async protected(req, res) {
        res.json({ user: req.user, is_logined: true });
    }
}

export default new AuthController();