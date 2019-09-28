import React, { Component } from "react";
import { Body, Container, Right, Left } from "lego-components";
export default class App extends Component {
  render() {
    return (
      <Body>
        <Container style={{ backgroundColor: "red" }}>
          <Left mobile={70} style={{ backgroundColor: "white", minWith: "10%" }}>
            Left
          </Left>
          <Right className="mw30 mwi-xl" style={{ backgroundColor: "black" }}>
            Right
          </Right>
        </Container>
        <Container>
          <h2>KOE</h2>
        </Container>
      </Body>
    );
  }
}
