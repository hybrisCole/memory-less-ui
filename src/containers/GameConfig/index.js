import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";
import { bindActionCreators } from "redux";
import { Container, Button, Header, Input, Divider } from "semantic-ui-react";
import { setTime, setName, setGridSize } from "../../actions/config";
import { startGame } from "../../actions/play";
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setTime,
      setName,
      startGame,
      setGridSize
    },
    dispatch
  )
});

class GameConfig extends Component {
  startGame = () => {
    if (validator.isEmpty(this.props.config.name)) {
      alert('Enter a name');
    } else {
      this.props.actions.startGame(this.props.config.size);
      this.props.history.push('/play');
    }
  };
  render() {
    return (
      <Container text>
        <Header as="h1" textAlign="center" style={{ paddingTop: 15 }}>
          Memory Less
        </Header>
        <Divider />

        <Header as="h2">Nickname</Header>
        <Input
          size="massive"
          fluid
          icon="user"
          placeholder="Nickname"
          onChange={(ev, data) => {
            this.props.actions.setName(
              validator.stripLow(validator.escape(data.value))
            );
          }}
        />
        <Divider />
        <Header as="h2">Grid Size</Header>
        <Button.Group size="large" fluid style={{ height: 70 }}>
          <Button
            primary={this.props.config.size === 4}
            onClick={() => {
              this.props.actions.setGridSize(4);
            }}
          >4x4</Button>
          <Button
            primary={this.props.config.size === 6}
            onClick={() => {
              this.props.actions.setGridSize(6);
            }}
          >6x6</Button>
          <Button
            primary={this.props.config.size === 8}
            onClick={() => {
              this.props.actions.setGridSize(8);
            }}
          >8x8</Button>
        </Button.Group>
        <Divider />
        <Header as="h2">Time</Header>
        <Button.Group size="large" fluid style={{ height: 70 }}>
          <Button
            primary={this.props.config.time === "30sec"}
            onClick={() => {
              this.props.actions.setTime("30sec");
            }}
          >
            30 sec
          </Button>
          <Button
            primary={this.props.config.time === "1min"}
            onClick={() => {
              this.props.actions.setTime("1min");
            }}
          >
            1 min
          </Button>
          <Button
            primary={this.props.config.time === "2min"}
            onClick={() => {
              this.props.actions.setTime("2min");
            }}
          >
            2 min
          </Button>
        </Button.Group>
        <Divider />
        <Button
          onClick={this.startGame}
          primary
          size="large"
          style={{ height: 70, fontSize: 28 }}
          fluid
        >
          Play!
        </Button>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameConfig);
