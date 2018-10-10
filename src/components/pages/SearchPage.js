import React from 'react'
import { Link } from 'react-router-dom';
import * as BookAPI from '../../BooksAPI';
import Book from '../Book';


class SearchPage extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        books: [],
                        results: [],
                        query: ''
                }
        }
        componentDidMount() {
                BookAPI.getAll()
                        .then(resp => {
                                this.setState({ books: resp }
                                )
                        });
        }

        updateQuery = (query) => {
                this.setState({ query: query }, this.submitSearch)
        }
        submitSearch() {
                if (this.state.query === '' || this.state.query === undefined) {
                        return this.setState({ results: [] });
                }
                BookAPI.search(this.state.query.trim()).then(res => {
                        if (res.error) {
                                return this.setState({ results: [] });
                        } else {
                                res.forEach(element => {
                                        let f = this.state.books.filter(b => b.id === element.id);
                                        element.shelf = f[0] ? f[0].shelf : null;
                                });
                                return this.setState({ results: res });
                        }
                });
        }

        updateBook = (book, shelf) => {
                BookAPI.update(book, shelf).then(resp => {
                        book.shelf = shelf;
                        this.setState(state => ({
                                books: state.books.filter(b => b.id !== book.id).concat([book])
                        }));
                });

        }
        render() {
                return (
                        <div className="search-books">
                                <div className="search-books-bar">
                                        <Link className="close-search" to="/">Close</Link>
                                        <div className="search-books-input-wrapper">
                                                <input type='text' placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                                        </div>
                                </div>
                                <div className="search-books-results">
                                        <ol className="books-grid">
                                                {
                                                        this.state.results.map((book, key) => <Book updateBook={this.updateBook} key={key} book={book} />)
                                                }
                                        </ol>
                                </div>
                        </div>
                );
        }

}

export default SearchPage;