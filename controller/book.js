const {request,response} = require('express');

const getBook = (req = request, res = response) => {

    return res.status(200).json({
        ok:true,
        msg: "getBook"
    });
};

const getBooks = (req = request, res = response) => {
    return res.status(200).json({
        ok:true,
        msg: "getBooks"
    });
};

const createBook = (req = request, res = response) => {
    return res.status(200).json({
        ok:true,
        msg: "createBook"
    });
};

const updateBook = (req = request, res = response) => {
    return res.status(200).json({
        ok:true,
        msg: "updateProduct"
    });
};

const deleteBook = (req = request, res = response) => {
    return res.status(200).json({
        ok:true,
        msg: "deleteProduct"
    });
};

module.exports = {
    getBook,
    getBooks,
    createBook,
    updateBook,
    deleteBook
}
