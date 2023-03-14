import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div className="container" data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
