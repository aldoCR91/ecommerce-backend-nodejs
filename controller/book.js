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
  }
};

const createBook = async (req = request, res = response) => {
  const book = new Book(req.body);

  try {
    const savedBook = await book.save();

    res.status(201).json({
      ok: true,
      msg: "Libro guardado",
      savedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo guardar el libro en la base de datos. Contactar con el administrador",
    });
  }
};

const updateBook = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "updateProduct",
  });
};

const deleteBook = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "deleteProduct",
  });
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
