import { customAlphabet } from 'nanoid';
import User from '../Schema/User.js'; // Adjust the path as per your project structure
import jwt from 'jsonwebtoken';

// Define the characters to be used in the password
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const allChars = lowercase + uppercase + numbers + specialChars;

// Function to generate a strong password
export const generateStrongPassword = (length = 16) => {
    const nanoid = customAlphabet(allChars, length);
    return nanoid();
};

export const generateUsername = async(email) => {
    let username = email.split('@')[0];
    let isUsernameNotUnique = await User.exists({ 'personal_info.username': username });
    if (isUsernameNotUnique) {
        const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5);
        username += nanoid();
    }
    return username;
};

export const formateDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1h' });

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    };
};
