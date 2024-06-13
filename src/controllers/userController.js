const pool = require('../db/db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Every field is obligatory' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password, create_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
            [username, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering the user' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are obligatory' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in the user' });
    }
};
