import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BrowseBooks.css';
import { selectAllBooks } from '../features/books/booksSlice';
import { useDispatch } from 'react-redux'
import { removeBook } from '../features/books/booksSlice';



const validCategories = ['fiction', 'non-fiction', 'sci-fi', 'fantasy', 'all'];

const BrowseBooks = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const books = useSelector(selectAllBooks) || [];
 
  const [searchTerm, setSearchTerm] = useState('');



  
  useEffect(() => {
    const cat = category?.toLowerCase();
    if (cat && !validCategories.includes(cat)) {
      navigate('/books/all', { replace: true });
    }
  }, [category, navigate]);

  
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    const cat = category?.toLowerCase();
    if (cat && cat !== 'all' && validCategories.includes(cat)) {
      filtered = filtered.filter((book) =>
        book.category?.toLowerCase() === cat
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [books, category, searchTerm]);

  const dispatch = useDispatch();
  return (
    <div className="browse-books">
      <h2>Browse Books {category ? `- ${category}` : ''}</h2>

      <input
        className="search-bar"
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            
            <div key={book.id} className="books-card">
                
              <img
                src={book.imageLink}
                alt={book.title}
                style={{ width: '100%', borderRadius: '6px', height: '250px', objectFit: 'cover' }}
              />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <Link to={`/book/${book.id}`}>View Details</Link>
              <button onClick={() =>dispatch (removeBook(book.id))}>Delete</button>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;
