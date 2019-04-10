import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SearchResults extends Component {
  render() {
    const { searchResults } = this.props;

    return (
      <div className="row justify-content-center">
        {searchResults.map(({ imdbID, Poster, Title, Type, Year }) => (
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
    );
  }
}

const mapStateToProps = ({ searchResults }) => ({
  searchResults,
});

export default connect(mapStateToProps)(SearchResults);
