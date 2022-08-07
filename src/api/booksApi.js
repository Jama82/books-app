import axios from "axios"

const booksApi = axios.create({
    baseURL: "http://localhost:3000"
})

export const getBooks = async () => {
    const response = await booksApi.get("/books")
    return response.data
}

export const addBook = async (book) => {
    return await booksApi.post("/books", book)
}

export const updateBook = async (book) => {
    return await booksApi.patch(`/books/${book.id}`, book)
}

export const deleteBook = async ({ id }) => {
    return await booksApi.delete(`/books/${id}`, id)
}

export default booksApi 