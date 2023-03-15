import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listMusic: [],
      titleAlbum: '',
      artistName: '',
      imageAlbum: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const newResponse = response.slice(1, response.lenght);
    this.setState({
      listMusic: newResponse,
      titleAlbum: response[0].collectionName,
      artistName: response[0].artistName,
      imageAlbum: response[0].artworkUrl100,
    });
  }

  render() {
    const { titleAlbum, artistName, imageAlbum, listMusic } = this.state;

    return (
      <div className="page-album" data-testid="page-album">
        <Header />
        <section className="container-album">
          <div className="card-album">
            <img className="image-album" src={ imageAlbum } alt={ titleAlbum } />
            <div className="infos-card">
              <h2
                data-testid="album-name"
                className="title-card-album"
              >
                { titleAlbum }

              </h2>
              <p
                data-testid="artist-name"
                className="name-artist-album"
              >
                { artistName }

              </p>
            </div>
          </div>
          <ul className="list-music">
            { listMusic.map((music) => (
              <li key={ music.trackId }>
                <MusicCard
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />
              </li>
            )) }
          </ul>
        </section>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}.isRequired;

export default Album;
