import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Dimmer,
  Loader,
  Container,
  Grid,
  Header,
  Divider,
  Progress
} from "semantic-ui-react";
import { selectNumber, freezeGame, resetPlay } from "../../actions/play";
import { updateLeaderboard } from "../../actions/leaderboard";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateLeaderboard,
      selectNumber,
      freezeGame,
      resetPlay
    },
    dispatch
  )
});

class Play extends Component {
  generateGridColumn = numberData =>
    <Grid.Column key={numberData.id} style={{ padding: 2 }}>
      <Button
        fluid
        basic={!numberData.found}
        color="blue"
        onClick={() => {
          this.props.actions.selectNumber(numberData.id);
        }}
        style={{ height: 60, fontSize: 18 }}
      >
        {numberData.selected || numberData.found ? numberData.number : "?"}
      </Button>
    </Grid.Column>;

  generateGridRow = row =>
    <Grid.Row key={Math.random()} style={{ margin: 0, padding: 0 }}>
      {_.map(row, number => this.generateGridColumn(number))}
    </Grid.Row>;

  generateUIGrid = () => {
    const rows = [];
    _.each(this.props.play.grid, row => {
      rows.push(this.generateGridRow(row));
    });
    return <Grid columns="equal">{rows}</Grid>;
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.play.finished &&
      !nextProps.play.gameFinished &&
      !nextProps.leaderboard.updatedLeaderboard
    ) {
      this.props.actions.freezeGame();
    }
    if (
      nextProps.play.finished &&
      nextProps.play.gameFinished &&
      !nextProps.leaderboard.updatedLeaderboard
    ) {
      this.props.actions.updateLeaderboard({
        ...this.props.play,
        ...this.props.config
      });
      this.props.actions.resetPlay();
    }
    if (nextProps.leaderboard.updatedLeaderboard) {
      this.props.history.push("/leaderboard");
    }
  }

  render() {
    return (
      <Container text>
        <Dimmer active={this.props.play.gameFinished} page>
          <Header as="h2" inverted>
            <Loader size="massive">Updating Leaderboard</Loader>
          </Header>
        </Dimmer>
        <Header as="h1" textAlign="center" style={{ paddingTop: 15 }}>
          Memory Less
        </Header>
        <Divider />
        <Header as="h2" textAlign="center">
          Time Elapsed
        </Header>
        <Progress
          size="medium"
          active
          indicating
          progress="ratio"
          total={this.props.config.time}
          value={this.props.play.elapsedTime}
        />
        <Divider />
        <Header as="h2" textAlign="center">
          Completed
        </Header>
        <Progress
          size="medium"
          active
          indicating
          progress
          percent={this.props.play.percentageComplete}
        />
        <Divider />
        {this.generateUIGrid()}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
