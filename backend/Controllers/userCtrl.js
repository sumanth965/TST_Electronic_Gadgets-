const bcryptjs = require('bcryptjs');
const User = require('../Model/user');

const Login = async (req, res) => {
    try {
        const body = req.body;

        const findUser = await User.findOne({ email: body.email });
        if (!findUser) {
            return res.status(404).json({ errorMessage: 'User not found' });
        }

        const comparePassword = await bcryptjs.compare(body.password, findUser.password);
        if (!comparePassword) {
            return res.status(401).json({ errorMessage: 'Invalid Password' });
        }

        res.send({ message: 'Success', data: findUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
};

const Register = async (req, res) => {
    try {
        const body = req.body;

        if (!body.name || !body.email || !body.password) {
            return res.status(400).json({ errorMessage: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({ errorMessage: 'Email already in use' });
        }

        const hashedPassword = await bcryptjs.hash(body.password, 10);

        const saveData = await User.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });

        res.send({ message: 'Success', data: saveData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
};

module.exports = {
    Login,
    Register,
};
