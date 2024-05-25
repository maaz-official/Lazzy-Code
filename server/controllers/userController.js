import bcrypt from 'bcrypt';
import User from '../Schema/User.js'; // Ensure the correct import path
import { generateStrongPassword, generateUsername, formateDatatoSend } from '../helper/generateStrongPassword.js';

const saltRounds = 10;

// Controller function for user signup
export const signup = async (req, res) => {
    const { fullname, username, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUserByEmail = await User.findOne({ 'personal_info.email': email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: '🚫🚫 Email is already registered 🚫🚫' });
        }

        // Generate a unique username if not provided or if the username already exists
        let uniqueUsername = username;
        if (!uniqueUsername || await User.findOne({ 'personal_info.username': username })) {
            uniqueUsername = await generateUsername(email);
        }

        // Generate a strong password if not provided
        let userPassword = password;
        if (!userPassword) {
            userPassword = generateStrongPassword();
        }

        // Check if the password meets length requirements
        if (userPassword.length < 6) {
            return res.status(400).json({ message: '🚫🚫 Password must be at least 6 characters long 🚫🚫' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: '🚫🚫 Please provide a valid email address 🚫🚫' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        // Create a new user instance
        const newUser = new User({
            personal_info: {
                fullname,
                username: uniqueUsername,
                email,
                password: hashedPassword,
            },
            social_links: {},
            account_info: {},
            google_auth: false,
            blogs: []
        });

        // Save the user to the database
        await newUser.save();

        // Format the user data for response
        const formattedUser = formateDatatoSend(newUser);

        // Return success response
        res.status(201).json({
            message: '🎉🎉🎉 User created successfully 🎉🎉🎉',
            user: formattedUser,
            suggestedPassword: password ? null : userPassword
        });
    } catch (error) {
        console.error('Error signing up user:', error.message, error.stack);
        res.status(500).json({ message: '❌❌ Server error ❌❌' });
    }
};

// Controller function for user signin
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists with the given email
        const user = await User.findOne({ 'personal_info.email': email });
        if (!user) {
            return res.status(400).json({ message: '🚫🚫 Invalid email or password 🚫🚫' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.personal_info.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: '🚫🚫 Invalid email or password 🚫🚫' });
        }

        // Format the user data for response
        const formattedUser = formateDatatoSend(user);

        // Return success response
        res.status(200).json({
            message: '🎉🎉🎉 User signed in successfully 🎉🎉🎉',
            user: formattedUser
        });
    } catch (error) {
        console.error('Error signing in user:', error.message, error.stack);
        res.status(500).json({ message: '❌❌ Server error ❌❌' });
    }
};

export default {
    signup
};
