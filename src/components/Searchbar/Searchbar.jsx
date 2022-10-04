import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Please, write something into the field.');
      return;
    }
    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
    e.currentTarget.reset();
  };

  handleChange = e => {
    const searchQuery = e.currentTarget.value.trim().toLowerCase();
    this.setState({ searchQuery });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <AiOutlineSearch className="SearchForm-icon" />
          </button>

          <input
            onChange={handleChange}
            name="query"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
