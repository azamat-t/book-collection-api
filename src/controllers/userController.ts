import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 1, // default role
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const token = generateToken(user.id, user.role);

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in.' });
  }
};
