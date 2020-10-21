const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../.config.js');
const { validateRegisterInput, validateLogin } = require('../../utils/validators');

const generateToken = (user) => {
    return jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username,
            }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = {
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword } }) {
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Input invalid',
                    { errors });
            }

            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is taken',
                    {
                        errors: {
                            username: 'This username is taken'
                        }
                    })
            }

            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res.id,
                token
            };
        },
        async login(_, { username, password }) {
            const { valid, errors } = validateLogin(username, password);
            if (!valid) {
                throw new UserInputError('Input invalid', {
                    errors
                });
            }
            const user = await User.findOne({ username });
            if (!user) {
                throw new UserInputError('User not found or pwd wrong',
                    {
                        errors: {
                            username: 'Username or pwd'
                        }
                    });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match){
             throw new UserInputError('User not found or PWD wrong',
                    {
                        errors: {
                            username: 'Username or pwd'
                        }
                    });
            }

            return {
                ...user._doc,
                id: user.id,
                token: generateToken(user)
            }
        }
    }
}
