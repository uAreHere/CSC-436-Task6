import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Book = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useNavigate();

  const { id } = useParams();

  const getBookData = async () => {
    const url = `https://api.matgargano.com/api/books/${id}`;
    setLoading(true);
    setError(false);
    try {
      const request = await fetch(url);
      const response = await request.json();
      setBook(response);
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookData();
  }, [id]);

  const goBack = () => {
    history("/books");
  };

  return (
    <Container>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      {!error && !loading && (
        <>
          <button onClick={goBack} className="btn btn-warning">
            Back to Books
          </button>
          <div className="card mb-3 max-width: 540px;">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={book.imageURL}
                  alt={book.title}
                  className="card-img-bottom"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h1 className="h2">{book.title}</h1>
                  <p className="card-text">Author: {book.author}</p>
                  <p className="card-text">Publisher: {book.publisher}</p>
                  <p className="card-text">Year: {book.year}</p>
                  <p className="card-text">Pages: {book.pages}</p>
                  <p className="card-text">Country: {book.country}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body"></div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Book;
