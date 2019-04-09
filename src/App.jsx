import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from './config';

class App extends Component {
  state = {
    isSearching: false,
    searchedMovies: [],
    currentPage: 1,
    totalResults: 0,
    error: null,
    searchKey: '',
    newSearch: false,
  };

  searchMovies = async () => {
    const { searchKey, currentPage } = this.state;

    Axios.get(`${API_URL}&s=${searchKey}&page=${currentPage}`).then(
      async ({ data: { Response, totalResults, Search = [], Error = '' } }) => {
        if (Response === 'False') {
          await this.setState(prevState => ({
            ...prevState,
            error: {
              message: Error,
            },
          }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            searchedMovies: [...prevState.searchedMovies, ...Search],
            totalResults,
          }));
        }
        this.finishSearch();
      },
      async err => {
        console.log('HTTP Request Error: ', err);
        await this.setState(prevState => ({
          ...prevState,
          error: err,
        }));
        this.finishSearch();
      }
    );
  };

  finishSearch = async () => {
    await this.setState(prevState => ({
      ...prevState,
      isSearching: false,
      newSearch: false,
    }));
  };

  handleSearch = async evt => {
    evt.preventDefault();

    await this.setState(prevState => ({
      ...prevState,
      searchedMovies: [],
      currentPage: 1,
      isSearching: true,
    }));

    this.searchMovies();
  };

  handleChange = async ({ target: { value = '' } = {} }) => {
    await this.setState(prevState => ({
      ...prevState,
      searchKey: value,
      newSearch: true,
    }));
  };

  nextPage = async () => {
    const { newSearch } = this.state;

    if (newSearch) {
      await this.setState(prevState => ({
        ...prevState,
        currentPage: 1,
        searchedMovies: [],
        newSearch: false,
      }));
    }

    const { currentPage } = this.state;

    await this.setState(prevState => ({
      ...prevState,
      currentPage: currentPage + 1,
      isSearching: true,
    }));

    this.searchMovies();
  };

  render() {
    const { isSearching, searchedMovies = [], totalResults } = this.state;

    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <div className="w-100 text-light text-center">Movie Database</div>
          </div>
        </nav>
        <div className="my-4 container">
          <div className="card">
            <div className="card-body">
              <form className="d-flex" onSubmit={evt => this.handleSearch(evt)}>
                <input
                  type="text"
                  className="form-control flex-grow mr-4"
                  placeholder="Enter a movie title"
                  onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="row justify-content-center">
            {searchedMovies.map(({ imdbID, Poster, Title, Type, Year }) => (
              <div key={imdbID} className="p-3 col-md-3 col-sm-4 col-xs-6">
                <div className="card w-100 h-100">
                  <img src={Poster} className="card-img-top" alt={Title} />
                  <div className="card-body">
                    <b>{Title}</b>
                    <div className="d-flex flex-row">
                      <div className="w-50">Type</div>
                      <div className="w-50">{Type}</div>
                    </div>
                    <div className="d-flex flex-row">
                      <div className="w-50">Year</div>
                      <div className="w-50">{Year}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isSearching && <div className="text-center">Loading....</div>}

          {searchedMovies.length < totalResults && (
            <div className="py-2 d-flex flex-row-reverse">
              <button
                className="btn btn-secondary"
                onClick={this.nextPage}>
                Next
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default App;
