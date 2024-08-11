import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const addBook = async (req: any, res: Response) => {
  const { title, author, genres } = req.body;
  console.log(req.body);
  const userId = req.user.userId;
  console.log(userId);
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publicationDate: new Date(),
        genres: [genres],
        userId,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error adding book.' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving books.' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving book.' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, publicationDate, genres } = req.body;

  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        author,
        publicationDate: new Date(publicationDate),
        genres: [genres],
      },
    });

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error updating book.' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting book.' });
  }
};
