import React from 'react';
import Header from '../components/Header';
import './Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Cards from '../components/Cards';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      searchName: '',
      listArtist: [],
      buttonDisable: true,
      buttonActive: false,
      isLoading: true,
    };
  }

  handleButtonClick = async (event) => {
    event.preventDefault();
    const { searchName } = this.state;

    this.setState({ buttonActive: true, artistName: searchName });

    const albunsArtist = await searchAlbumsAPI(searchName);
    this.setState({
      searchName: '',
      listArtist: albunsArtist,
      isLoading: false,
    });
    this.setState({ buttonActive: false });
  };

  verifyInput = () => {
    const { searchName } = this.state;
    const MIN = 2;

    if (searchName.length < MIN) {
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
    const { searchName, artistName, buttonDisable,
      buttonActive, isLoading, listArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="main-page">
          <form className="form-container">
            <input
              className="input-search"
              data-testid="search-artist-input"
              name="searchName"
              value={ searchName }
              type="text"
              onChange={ this.onInputChange }
              placeholder="Nome do Artista"
            />
            <button
              className="btn-search"
              name="searchName"
              data-testid="search-artist-button"
              disabled={ buttonDisable }
              onClick={ this.handleButtonClick }
            >
              Pesquisar

            </button>
          </form>
          <section className="main-section">

            { buttonActive && <Loading /> }

            { !isLoading && <h2>{ `Resultado de álbuns de: ${artistName}` }</h2> }

            <div className="container-cards">
              {
                (!isLoading && listArtist.length > 0)
                  ? listArtist.map((artist) => (
                    <Cards
                      key={ artist.collectionName }
                      imageAlbum={ artist.artworkUrl100 }
                      titleAlbum={ artist.collectionName }
                      artistName={ artist.artistName }
                      collectionId={ artist.collectionId }
                    />
                  )) : <h2>Nenhum álbum foi encontrado</h2>
              }
            </div>

          </section>

        </div>
      </div>
    );
  }
}

export default Search;
