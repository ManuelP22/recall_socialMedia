import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js"

export const singin = async (req, res) => {
    const { email, password} = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "El usuaruio no existe."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Credenciales invalidas."});

        const token = jwt.sing({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal.' });
    }
}

export const singup = async (req, res) => {
    const { email, password, confirmPassword, fistName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "El usuaruio ya existe."});

        if(password !== confirmPassword) return res.status(400).json({ message: "Las contraseñas no coinciden."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${fistName} ${lastName}` })

        const token = jwt.sing({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token});
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal.' });
    }
}