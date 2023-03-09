const { request, response } = require("express");
const Book = require("../models/Book");

const getBook = async (req = request, res = response) => {
  try {
    const book = await Book.findById(req.params.bid).populate("user", "name");

    if (!book) {
      return res.status(404).json({
        ok: false,
        msg: "Libro no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error no se pueden mostr",
    });
  }
};

const getBooks = async (req = request, res = response) => {
  try {

    const books = await Book.find().populate("user", "name");

    return res.status(200).json({
      ok: true,
      books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error no se pueden mostrar los libros",
    });
  }
};

const createBook = async (req = request, res = response) => {

  const book = new Book(req.body);

  try {

    book.user = req.uid;

    const savedBook = await book.save();

    return res.status(201).json({
      ok: true,
      msg: "Libro guardado",
      savedBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "No se pudo guardar el libro en la base de datos. Contactar con el administrador",
    });
  }
};

const updateBook = async (req = request, res = response) => {
  const bookID = req.params.bid;
  const uid = req.uid;

  try {
    const book = await Book.findById(bookID);

    if (!book) {
      res.status(404).json({
        ok: false,
        msg: "Libro no encontrado",
      });
    }

    if (book.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: "Usuario no autorizado",
      });
    }

    const newBook = {
      ...req.body,
      user: uid,
    };

    const updatedBook = await Book.findByIdAndUpdate(bookID, newBook, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      book: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo actualizar. Contactar con el administrador",
    });
  }
  return res.status(200).json({
    ok: true,
    msg: "updateProduct",
  });
};

const deleteBook = async (req = request, res = response) => {
  const bookID = req.params.bid;
  const uid = req.uid;

  try {
    const book = await Book.findById(bookID);

    if (!book) {
      res.status(404).json({
        ok: false,
        msg: "Libro no encontrado",
      });
    }

    if (book.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: "Usuario no autorizado",
      });
    }

    const deletedBook = await Book.findByIdAndDelete(bookID);

    res.status(200).json({
      ok: true,
      book: deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo actualizar. Contactar con el administrador",
    });
  }
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
