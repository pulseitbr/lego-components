import { Body, Button, Container, Footer, Modal, Page, Title, View } from "lego-components";
import React, { Component } from "react";
export default class App extends Component {
  render() {
    return (
      <Page>
        <Body>
          <Container>
            <Modal visible>AEEEEEEEEEEEE</Modal>
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
