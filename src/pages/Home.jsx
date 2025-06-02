import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
    const books = useSelector(state => state.books.books);
  console.log('Books from Redux:', books);


  return (
    <div>
      <h1>Welcome to the Online Library System</h1>

      <h2>All Books</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '200px',
              textAlign: 'center'
            }}
          >
            <img
              src={book.imageLink}
              alt={book.title}
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <Link to={`/book/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
