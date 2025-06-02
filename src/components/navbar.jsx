import { Link } from 'react-router-dom';
import './Navbar.css';


export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Online Library</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/books/all">Browse Books</Link>
        <Link to="/add-book">Add Book</Link>
      </div>
    </nav>
  );
}