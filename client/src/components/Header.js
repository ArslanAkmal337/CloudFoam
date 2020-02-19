import PropTypes from "prop-types";
import React from "react";
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

import RightMenu, { LeftMenu } from "./Menu";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const getHeight = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minHeight : window.innerHeight;
};

class DesktopContainer extends React.Component {
  state = {};

  render() {
    const { children } = this.props;
    const { fixed } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false}>
          <div
            className="ui inverted segment attached"
            style={{ zIndex: 1000 }}
          >
            <div className="ui inverted secondary pointing menu">
              <LeftMenu activeItem={this.props.activeItem} />
              <div className="right menu">
                <RightMenu activeItem={this.props.activeItem} />
              </div>
            </div>
          </div>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends React.Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { activeItem, children } = this.props;
    const { sidebarOpened } = this.state;
    const h = getHeight();

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <LeftMenu activeItem={activeItem} />
          <Menu.Item>
            <RightMenu activeItem={activeItem} mobile sidebar />
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "1em 0em", zIndex: "1000" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary>
                <div
                  className="valign"
                  style={{
                    padding: "1em"
                  }}
                >
                  <i
                    className="bars icon large"
                    aria-hidden="true"
                    onClick={this.handleToggle}
                  />
                </div>
                <Menu.Item position="right">
                  <RightMenu activeItem={activeItem} />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          <div style={{ minHeight: `${h}px` }}>{children}</div>
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const Header = ({ activeItem, children }) => (
  <div>
    <DesktopContainer activeItem={activeItem}>{children}</DesktopContainer>
    <MobileContainer activeItem={activeItem}>{children}</MobileContainer>
  </div>
);

Header.propTypes = {
  children: PropTypes.node
};

export default Header;

//  <div className="ui inverted segment attached">
//     <div className="ui inverted secondary pointing menu">
//       <LeftMenu activeItem={this.props.activeItem} />
//       <div className="right menu">
//         <RightMenu activeItem={this.props.activeItem} />
//       </div>
//     </div>
//   </div>
