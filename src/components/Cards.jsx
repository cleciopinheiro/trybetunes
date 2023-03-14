import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Cards.css';

class Cards extends React.Component {
  render() {
    const { imageAlbum, artistName, titleAlbum, collectionId } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="cards-album">
          <img className="img-card" src={ imageAlbum } alt={ artistName } />
          <p>{ titleAlbum }</p>
          <p>{ artistName }</p>
          Detalhes
        </div>
      </Link>
    );
  }
}

Cards.propTypes = {
  imageAlbum: PropTypes.string,
  artistName: PropTypes.string,
  titleAlbum: PropTypes.string,
  collectionId: PropTypes.number,
}.required;

export default Cards;
