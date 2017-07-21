import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Header, Divider, Dimmer, Loader } from "semantic-ui-react";
import { resetConfig } from "../../actions/config";
import { resetPlay } from "../../actions/play";
import { retrieveLeaderboard } from "../../actions/leaderboard";
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetPlay,
      resetConfig,
      retrieveLeaderboard
    },
    dispatch
  )
});

class Leaderboard extends Component {
  componentWillMount() {
    this.props.actions.retrieveLeaderboard();
  }
  render() {
    return (
      <Container text>
        <Dimmer active={this.props.leaderboard.retrievingLeaderboard} page>
          <Header as="h2" inverted>
            <Loader size="massive">Retrieving Leaderboard</Loader>
          </Header>
        </Dimmer>
        <Header as="h1" textAlign="center" style={{ paddingTop: 15 }}>
          Memory Less
        </Header>
        <Divider />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
