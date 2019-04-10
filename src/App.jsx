import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './store/actions';

import Navbar from './components/Navbar';
import Search from './components/Search';
import SearchResults from './components/SearchResults';

class App extends Component {
  render() {
    const {
      isSearching,
      searchResults,
      totalResults,
      error,
      actions: { nextPage },
    } = this.props;

    return (
      <>
        <Navbar />
        <div className="my-4 container">
          <Search />

          {!!searchResults.length && <SearchResults />}

          {isSearching && <div className="text-center">Loading....</div>}

          {!!error && <div className="mt-4 alert alert-danger">{error}</div>}

          {searchResults.length < totalResults && (
            <div className="py-2 d-flex flex-row-reverse">
              <button className="btn btn-secondary" onClick={nextPage}>
                Next
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  isSearching,
  searchResults,
  totalResults,
  error,
}) => ({
  isSearching,
  searchResults,
  totalResults,
  error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
