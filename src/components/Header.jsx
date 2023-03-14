import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../images/logo.png';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userReturn: false,
      user: '',
    };
  }

  async componentDidMount() {
    const response = await getUser();
    this.setState({ userReturn: true, user: response.name });
  }

  render() {
    const { userReturn, user } = this.state;

    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          {userReturn ? <h2 className="user-header">{`Olá, ${user}!`}</h2> : <Loading />}
        </div>
        <nav>
          <Link
            className="nav-link"
            to="/search"
            data-testid="link-to-search"
          >
            Search

          </Link>
          <Link
            className="nav-link"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites

          </Link>
          <Link
            className="nav-link"
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile

          </Link>
        </nav>
        <img src={ logo } alt="" />
      </header>
    );
  }
}

export default Header;
