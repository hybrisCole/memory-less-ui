import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Container,
  Grid,
  Header,
  Divider,
  Progress
} from "semantic-ui-react";
import { selectNumber } from "../../actions/play";
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      selectNumber
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
  render() {
    return (
      <Container text>
        <Header as="h1" textAlign="center" style={{ paddingTop: 15 }}>
          Memory Less
        </Header>
        <Divider />
        <Header as="h2" textAlign="center" style={{ paddingTop: 15 }}>
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
