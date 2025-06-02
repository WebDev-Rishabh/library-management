import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './BookDetails.css';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = useSelector(state => state.books.books.find(b => b.id === id));

  if (!book) return <p className="not-found">Book not found.</p>;

  return (
    <div className="card-container">
      <div className="book-card">
        <img
          src={book.imageLink}
          alt={book.title}
          className="book-image"
        />
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>Rating:</strong> {book.rating}</p>
          <p>
            <strong>Link:</strong>{' '}
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </p>
          <button onClick={() => navigate(-1)} className="back-button">
            Back to Browse
          </button>
        </div>
      </div>
    </div>
  );
}
