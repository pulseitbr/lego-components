import React, { Component } from "react";
import { Body, Page, Container, Button, Title, View, Footer, GlobalStyle } from "lego-components";
export default class App extends Component {
  render() {
    return (
      <Page>
        <Body>
          {/* <Modal title="AEEE">AEEEEEEEEEEEE</Modal> */}
          <Container>
            <View span="10%" style={{ backgroundColor: "red" }}>
              AEEE
            </View>
            <View span="90%" style={{ backgroundColor: "blue" }}>
              AEEE
            </View>
          </Container>
          <Container>
            <Container>
              <Title>KOE</Title>
            </Container>
            <Container>
              <Button>Click</Button>
            </Container>
          </Container>
        </Body>
        <Footer>
          <Container style={{ textAlign: "center", fontWeight: "bolder" }}>Footer</Container>
        </Footer>
      </Page>
    );
  }
}
