import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorites: false,
    };
  }

  async componentDidMount() {
    const { trackName } = this.props;
    this.setState({ isLoading: true });
    const response = await getFavoriteSongs();
    this.setState({
      favorites: response.some((song) => song.trackName === trackName),
      isLoading: false,
    });
  }

  handleInputChange = async ({ target }) => {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked } = target;
    this.setState({ [target.name]: checked, isLoading: true });
    await addSong({ trackName, previewUrl, trackId });
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, favorites } = this.state;
    return (
      isLoading ? <Loading /> : (
        <div className="container-music">
          <h3>{ trackName }</h3>
          <div className="player">
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              { ' ' }
              <code>audio</code>
            </audio>
            <label
              className="label-favorites"
              htmlFor={ `checkbox-music-${trackId}` }
              data-testid={ `checkbox-music-${trackId}` }
            >
              Favorita
              <input
                type="checkbox"
                name="favorites"
                checked={ favorites }
                id={ `checkbox-music-${trackId}` }
                onChange={ this.handleInputChange }
              />
            </label>
          </div>
        </div>)
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
