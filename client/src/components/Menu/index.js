import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';

export const LeftMenu = props => {
  return [
    <Menu.Item
      as={Link}
      to="/"
      active={props.activeItem === 'home' ? true : false}
    >
      Home
    </Menu.Item>,
    <Menu.Item
      as={Link}
      to="/about"
      active={props.activeItem === 'about' ? true : false}
    >
      About
    </Menu.Item>,
    <Menu.Item
      as={Link}
      to="/prices"
      active={props.activeItem === 'prices' ? true : false}
    >
      Prices
    </Menu.Item>,
    <Menu.Item
      as={Link}
      to="/careers"
      active={props.activeItem === 'careers' ? true : false}
    >
      Careers
    </Menu.Item>
  ];
};

class RightMenu extends React.Component {
  render() {
    const fixed = this.props.fixed;
    const mobile = this.props.mobile;

    const style = mobile ? { fontSize: '1em' } : null;

    switch (this.props.auth) {
      case null:
        return (
          <div>
            <Link to="/login">
              <Button as="a" inverted={!fixed} style={style}>
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                as="a"
                inverted={!fixed}
                primary={fixed}
                style={{ ...style, marginLeft: '0.5em' }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        );
      case false:
        return (
          <div>
            <Link to="/login">
              <Button as="a" inverted={!fixed} style={style}>
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                as="a"
                inverted={!fixed}
                primary={fixed}
                style={{ ...style, marginLeft: '0.5em' }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        );
      default:
        return [
          <Menu.Item
            as={Link}
            to="/dashboard"
            active={this.props.activeItem === 'dashboard' ? true : false}
          >
            Dashboard
          </Menu.Item>,
          <a
            href="/api/logout"
            onClick={() => localStorage.removeItem('JWT')}
            style={{ marginLeft: '1em' }}
          >
            <Button inverted={mobile ? true : !fixed} style={style}>
              Logout
            </Button>
          </a>
        ];
    }
  }
}
RightMenu.defaultProps = {
  fixed: false,
  mobile: false,
  sidebar: false
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(RightMenu);
