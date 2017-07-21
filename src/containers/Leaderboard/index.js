import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import {
  Container,
  Header,
  Divider,
  Dimmer,
  Loader,
  Button,
  Table
} from "semantic-ui-react";
import { resetConfig } from "../../actions/config";
import { resetPlay } from "../../actions/play";
import {
  retrieveLeaderboard,
  resetLeaderboard
} from "../../actions/leaderboard";
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetPlay,
      resetConfig,
      resetLeaderboard,
      retrieveLeaderboard
    },
    dispatch
  )
});

class Leaderboard extends Component {
  playAgain = () => {
    this.props.actions.resetConfig();
    this.props.actions.resetPlay();
    this.props.actions.resetLeaderboard();
    this.props.history.push("/");
  };
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
        {this.props.leaderboard.leaderboardData.map(sizeData =>
          <div
            style={{ paddingTop: 10, paddingBottom: 10 }}
            key={Math.random()}
          >
            <Header as="h2" style={{ paddingTop: 15 }}>
              Size: {sizeData.size}
            </Header>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Elapsed Time</Table.HeaderCell>
                  <Table.HeaderCell>Percentage Complete</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sizeData.scores.map(score =>
                  <Table.Row
                    key={score.id}
                    positive={this.props.leaderboard.scoreId === score.id}
                  >
                    <Table.Cell>{score.name}</Table.Cell>
                    <Table.Cell>{score.elapsedTime}</Table.Cell>
                    <Table.Cell>{score.percentageComplete}</Table.Cell>
                    <Table.Cell>
                      {moment(score.scoreDate).format("DD MMM YYYY hh:mm a")}
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        )}
        <Button
          onClick={this.playAgain}
          primary
          size="large"
          style={{ height: 70, fontSize: 28 }}
          fluid
        >
          Play Again!
        </Button>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
