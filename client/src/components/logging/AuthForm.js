import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class AuthForm extends React.Component {
  state = { email: "", password: "" };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
        inverted
      >
        <Grid.Column style={{ maxWidth: 460 }}>
          <Header
            as="h2"
            textAlign="center"
            style={{ background: "black", color: "white" }}
          >
            <Image src="assets/logo.png" /> {this.props.headerText}
          </Header>
          <Form
            size="large"
            onSubmit={() =>
              this.props.onSubmit(this.state.email, this.state.password)
            }
          >
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                onChange={this.handleChange("email")}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={this.handleChange("password")}
              />

              <Button color="black" fluid size="large">
                {this.props.submitText}
              </Button>
            </Segment>
            <a
              href="/auth/google"
              className="ui red google button"
              role="button"
            >
              <i className="google icon" />
              {this.props.text} with Google
            </a>
            <a
              href="/auth/facebook"
              className="ui facebook button"
              role="button"
            >
              <i className="facebook icon" />
              {this.props.text} with Facebook
            </a>
          </Form>
          <Message>
            {this.props.messageQ}
            <Link to={this.props.messageTo}>{this.props.messageLinkText}</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AuthForm;
