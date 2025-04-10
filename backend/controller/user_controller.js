import prisma from '../prisma.js';
import bcrypt from 'bcrypt';

class UserController {
    async createUser(req, res) {
        try {
            const { name, surname, email, password } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(400).json({ message: "Email already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({
                data: {
                    name,
                    surname,
                    email,
                    password: hashedPassword,
                    bio: { create: { description: "" } }
                },
                select: { id: true, name: true, email: true }
            });

            res.status(201).json(newUser);
        } catch (error) {
            console.error('Create user error:', error);
            res.status(500).json({ message: "Server error" });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                select: { id: true, name: true, surname: true, email: true }
            });

            user ? res.json(user) : res.status(404).json({ message: "User not found" });
        } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default new UserController();