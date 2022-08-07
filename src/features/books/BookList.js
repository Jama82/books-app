import { useQuery, useMutation, useQueryClient } from "react-query"
import { getBooks, addBook, updateBook, deleteBook } from "../../api/booksApi"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'


const BookList = () => {
    const [newBook, setNewBook] = useState('')
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data: books
    } = useQuery('books', getBooks, {
        select: data => data.sort((a, b) => b.id - a.id)
    })

    const addBookMutation = useMutation(addBook, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("books")
        }
    })

    const updateBookMutation = useMutation(updateBook, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("books")
        }
    })

    const deleteBookMutation = useMutation(deleteBook, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("books")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addBookMutation.mutate({ userId: 1, title: newBook, completed: false })
        setNewBook('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-book">Enter a new todo item</label>
            <div className="new-book">
                <input
                    type="text"
                    id="new-book"
                    value={newBook}
                    onChange={(e) => setNewBook(e.target.value)}
                    placeholder="Enter new book"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    let content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p>{error.message}</p>
    } else {
        content = books.map((book) => {
            return (
                <article key={book.id}>
                    <div className="book">
                        <input
                            type="checkbox"
                            checked={book.completed}
                            id={book.id}
                            onChange={() =>
                                updateBookMutation.mutate({ ...book, completed: !book.completed })
                            }
                        />
                        <label htmlFor={book.id}>{book.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteBookMutation.mutate({ id: book.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    }

    return (
        <main>
            <h1>Books App</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default BookList