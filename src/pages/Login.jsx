import React from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import logo from '../images/logo.png';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonDisable: true,
      buttonActive: false,
      isLoading: true,
    };
  }

  handleButtonClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;

    this.setState({ buttonActive: true });

    await createUser({ name });
    this.setState({
      isLoading: false,
    });
  };

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    }, this.verifyInput);
  };

  verifyInput = () => {
    const { name } = this.state;
    const MIN = 3;

    if (name.length < MIN) {
      this.setState({
        buttonDisable: true,
      });
    } else {
      this.setState({
        buttonDisable: false,
      });
    }
  };

  render() {
    const { buttonDisable, name, isLoading, buttonActive } = this.state;

    return (

      <div className="container-login" data-testid="page-login">
        <form className="form-login">
          <img src="" alt="" srcSet={ logo } />
          <div className="inputs-container">
            <input
              className="input-login"
              value={ name }
              name="name"
              data-testid="login-name-input"
              type="text"
              onChange={ this.onInputChange }
              placeholder="Digite seu nome"
            />
            <button
              className="btn-login"
              disabled={ buttonDisable }
              data-testid="login-submit-button"
              onClick={ this.handleButtonClick }
            >
              Entrar
            </button>
          </div>
          { buttonActive && <Loading /> }
          { !isLoading && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
