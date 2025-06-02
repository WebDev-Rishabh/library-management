import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../features/books/booksSlice';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

export default function AddBook() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    rating: '',
    category: '',
    imageLink: '', 
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, description, rating, category, imageLink } = form;
    if (!title || !author || !description || !rating || !category || !imageLink) {
      return alert('All fields including image are required');
    }

    const newBook = {
      ...form,
      id: Date.now().toString(),
    };

    dispatch(addBook(newBook));
    navigate(`/books/${category.toLowerCase()}`);
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input type="text" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="text" placeholder="Author" onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        <input type="number" placeholder="Rating" onChange={(e) => setForm({ ...form, rating: e.target.value })} />
        <input type="text" placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input type="text" placeholder="Image URL" onChange={(e) => setForm({ ...form, imageLink: e.target.value })} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
