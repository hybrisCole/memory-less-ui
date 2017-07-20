import React, { Component } from "react";
import _ from 'lodash';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Grid, Header, Divider } from "semantic-ui-react";
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {

    },
    dispatch
  )
});

const generateGridColumn = (number) => <Grid.Column key={Math.random()}>{number}</Grid.Column>;
const generateGridRow = (row) => <Grid.Row key={Math.random()}>{_.map(row, (number) => generateGridColumn(number))}</Grid.Row>;

const generateUIGrid = (grid) => {
  const rows = [];
  _.each(grid, (row) => {
    rows.push(generateGridRow(row));
  })
  return <Grid columns='equal' celled='internally'>{rows}</Grid>;
};

class Play extends Component {
  render() {
    return (
      <Container text>
        <Header as="h1" textAlign="center" style={{ paddingTop: 15 }}>
          Memory Less
        </Header>
        <Divider />
        {generateUIGrid(this.props.play.grid)}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
