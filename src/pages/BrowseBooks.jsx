import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BrowseBooks.css';
import { selectAllBooks, removeBook } from '../features/books/booksSlice';

const validCategories = ['all', 'fiction', 'non-fiction', 'sci-fi', 'fantasy'];

const BrowseBooks = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  useEffect(() => {
    const cat = category?.toLowerCase();
    if (cat && !validCategories.includes(cat)) {
      navigate('/books/all', { replace: true });
    } else {
      setSelectedCategory(cat || 'all');
    }
  }, [category, navigate]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    navigate(`/books/${newCategory}`);
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(removeBook(id));
    }
  };

  const filteredBooks = useMemo(() => {
    let filtered = [...books];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (book) => book.category?.toLowerCase() === selectedCategory
      );
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [books, selectedCategory, searchTerm]);

  return (
    <div className="browse-books">
      <h2>Browse Books - {selectedCategory}</h2>

      <div className="filters">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="category-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {validCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div key={book.id} className="books-card">
              <img src={book.imageLink} alt={book.title} />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <Link to={`/book/${book.id}`}>View Details</Link>
              <button className="delete-btn" onClick={() => handleRemove(book.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;
