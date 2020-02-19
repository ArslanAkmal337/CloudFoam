import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'react-router-dom';

import Header from './Header';
import { handleToken } from '../actions';

const circle = {
  width: 125,
  height: 125,
  backgroundColor: '#1b1c1d',
  borderRadius: '50%',
  display: 'flex',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop: 10,
  marginBottom: 10,
  alignItems: 'center'
};

const cardStyle = {
  margin: 10
};

const plan1 = {
  title: 'Basic',
  price: { value: '$5', period: '' },
  description1: 'one-off payment',
  description2: 'Description of option #1',
  bestvalue: false,
  stripe: { amount: 500, description: '$5 one-off payment for Basic plan' }
};

const plan2 = {
  title: 'Advanced',
  price: { value: '$10', period: '/mo' },
  description1: 'monthly subscription, cancel anytime',
  description2: 'Description of option #2',
  bestvalue: true,
  stripe: { amount: 1000, description: '$10/mo subscription for Advanced plan' }
};

const plan3 = {
  title: 'Enterprise',
  price: { value: '$30', period: '/mo' },
  description1: 'monthly subscription, cancel anytime',
  description2: 'Description of option #3',
  bestvalue: false,
  stripe: {
    amount: 3000,
    description: '$30/mo subscription for Enterprise plan'
  }
};

class Prices extends React.Component {
  cardContent = ({ title, price, description1, description2, bestvalue }) => {
    return (
      <div className="ui centered card" onClick={() => console.log('clicked')}>
        <div className="ui attached inverted header center aligned">
          {title}
        </div>
        <div className="ui content">
          {bestvalue ? (
            <div className="ui blue ribbon label">Best value</div>
          ) : null}
          <div className="ui centered container center aligned">
            <div style={circle}>
              <h2 class="ui inverted header" style={{ flex: 1 }}>
                {price.value}
                <div className="sub header">{price.period}</div>
              </h2>
            </div>
            <div className="meta">{description1}</div>
            <div className="ui divider"></div>
            <div className="description">{description2}</div>
            <div className="ui divider"></div>
            <div className="ui primary button">Select</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.props.auth, 'auth');
    const StripePay = plan => (
      <StripeCheckout
        name="Company name"
        description={plan.stripe.description}
        amount={plan.stripe.amount}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        {this.cardContent(plan)}
      </StripeCheckout>
    );

    return (
      <Header activeItem="prices">
        <div className="ui container">
          <h1 className="ui header center aligned" style={{ marginTop: 20 }}>
            Get Instant Access To #######
          </h1>
          <div className="ui divider"></div>

          <div
            className="ui three column stackable grid"
            style={{ padding: 10, marginTop: 10, marginBottom: 10 }}
          >
            <div className="column">
              <div className="ui link cards halign" style={cardStyle}>
                {this.props.auth ? (
                  StripePay(plan1)
                ) : (
                  <Link to="/signup">{this.cardContent(plan1)}</Link>
                )}
              </div>
            </div>
            <div class="column">
              <div className="ui link cards halign" style={cardStyle}>
                {this.props.auth ? (
                  StripePay(plan2)
                ) : (
                  <Link to="/signup">{this.cardContent(plan2)}</Link>
                )}
              </div>
            </div>
            <div class="column">
              <div className="ui link cards halign" style={cardStyle}>
                {this.props.auth ? (
                  StripePay(plan3)
                ) : (
                  <Link to="/signup">{this.cardContent(plan3)}</Link>
                )}
              </div>
            </div>
          </div>
          <div className="ui divider"></div>
          <div className="ui centered container center aligned">
            <h1 className="ui header" style={{ marginTop: 20 }}>
              Still have questions?
            </h1>
            <div className="ui  primary button">Get In Touch</div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { handleToken })(Prices);
