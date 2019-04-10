import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../store/actions';

export class Search extends Component {
  state = {
    searchKey: '',
  };

  handleChange = async ({ target: { value } }) => {
    await this.setState(prevState => ({
      ...prevState,
      searchKey: value,
    }));
  };

  handleSearch = (evt) => {
    evt.preventDefault();

    const { searchKey } = this.state;
    const { actions: { search } } = this.props;

    search(searchKey);
  }

  render() {
    return (
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
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
