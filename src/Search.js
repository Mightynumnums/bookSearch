import React, { Component } from 'react'
import './Search.css'
// import axios from 'axios'

// const { API_URL } = 'http://openlibrary.org'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleName: '',
      authorName: '',
      isbn: '',
      genre: '',
      results: []
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleTitleNameInput = this.handleTitleNameInput.bind(this)
    this.handleAuthorNameInput = this.handleAuthorNameInput.bind(this)
    this.handleIsbnInput = this.handleIsbnInput.bind(this)
    this.handleGenreInput = this.handleGenreInput.bind(this)
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${event.target.author.value}+isbn:${event.target.isbn.value}`)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ results: responseJson.items })
      })
  }

  handleTitleNameInput(event) {
    this.setState({ titleName: event.target.value })
  }

  handleAuthorNameInput(event) {
    this.setState({ authorName: event.target.value })
  }

  handleIsbnInput(event) {
    this.setState({ isbn: event.target.value })
  }

  handleGenreInput(event) {
    this.setState({ genre: event.target.value })
  }


  render() {
    return (
      <div>
        <h1>Search for a book</h1>
        <form className="searchForm"
          onSubmit={this.handleSearchSubmit}
        >
          <label>Title Name
            <input
              type='text'
              name='title'
              value={this.state.titleName}
              onChange={this.handleTitleNameInput} />
          </label>
          <br></br>

          <label>Author Name
           <input
              type='text'
              name='author'
              value={this.state.authorName}
              onChange={this.handleAuthorNameInput}
            />
          </label>

          <label>ISBN #
            <input type='text'
              name='isbn'
              value={this.state.isbn}
              onChange={this.handleIsbnInput}
            />
          </label>

          <label>Genre
            <input
              type='text'
              name='genre'
              value={this.state.genre}
              onChange={this.handleGenreInput}
            />
          </label>
          <button>Search</button>
        </form>
        <div className='bookResults'>
          <ul>
            {this.state.results.map((val, idx) => {
              return (
                <li key={idx}>
                  <h4>Title: {val.volumeInfo.title}</h4>
                  <h4>Author Name: {val.volumeInfo.authors}</h4>
                  <h4>Category: {val.volumeInfo.categories}</h4>
                  <p>{val.volumeInfo.description}</p>
                  <img src={val.volumeInfo.imageLinks.thumbnail} alt='https://image.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg' />
                </li>


              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
