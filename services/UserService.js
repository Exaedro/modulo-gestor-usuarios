const db = require('../config/database');
const bcrypt = require('bcryptjs');

class UserService {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM usuarios');
        return rows;
    }

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    }

    async updateRole(id, newRole) {
        // Check if user exists first
        const user = await this.getById(id);
        if (!user) return null;

        await db.query('UPDATE usuarios SET rol = ? WHERE id = ?', [newRole, id]);
        return this.getById(id);
    }

    async updatePassword(id, newPassword) {
        // Check if user exists first
        const user = await this.getById(id);
        if (!user) return null;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE usuarios SET password_hash = ? WHERE id = ?', [hashedPassword, id]);
        return this.getById(id);
    }
}

module.exports = new UserService();
