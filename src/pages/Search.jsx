import React from 'react';
import Header from '../components/Header';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      buttonDisable: true,
    };
  }

  verifyInput = () => {
    const { artistName } = this.state;
    const MIN = 2;

    if (artistName.length < MIN) {
      this.setState({
        buttonDisable: true,
      });
    } else {
      this.setState({
        buttonDisable: false,
      });
    }
  };

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    }, this.verifyInput);
  };

  render() {
    const { artistName, buttonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="container">
          <form className="form-container">
            <input
              className="input-search"
              data-testid="search-artist-input"
              name="artistName"
              value={ artistName }
              type="text"
              onChange={ this.onInputChange }
              placeholder="Nome do Artista"
            />
            <button
              className="btn-search"
              data-testid="search-artist-button"
              disabled={ buttonDisable }
            >
              Pesquisar

            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
