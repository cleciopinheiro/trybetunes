import React from 'react';
import './Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <h3 className="text-loading">Carregando...</h3>
      </div>
    );
  }
}

export default Loading;
