import React from 'react';
import * as BookAPI from '../BooksAPI';

class Book extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        book: props.book
                }
        }
        componentDidMount() {

        }

        render() {
                return (
                        <li>
                                <div className="book">
                                        <div className="book-top">
                                                <div className="book-cover"
                                                        style={{ width: 128, height: 188, backgroundImage: `url("${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail || ""}")` }}>

                                                </div>
                                                <div className="book-shelf-changer">
                                                        <select value={this.props.book.shelf || "none"} onChange={e => { this.props.updateBook(this.props.book, e.target.value) }}>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading</option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                        </select>
                                                </div>
                                        </div>
                                        <div className="book-title">{this.props.book.title}</div>
                                        <div className="book-authors">{this.props.book.authors && this.props.book.authors[0] || "No Authors..."}</div>
                                </div>
                        </li>
                );

        }
}

export default Book;
