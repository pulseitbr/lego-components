import { Body, Button, Container, Footer, Form, Page } from "lego-components";
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setList((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <Page>
      <Body>
        <Container>
          <Form onSubmit={onSubmit}>
            <input type="text" value={input} onChange={onChange} />
            <Button type="submit">Submit</Button>
          </Form>
          <Container>
            <ul>
              {list.map((string) => (
                <li key={string} style={{ color: "green" }}>
                  {string}
                </li>
              ))}
            </ul>
          </Container>
        </Container>
      </Body>
    </Page>
  );
}

class AnotherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", list: [] };
  }

  onChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState((prev) => {
      return { input: "", list: [...prev.list, prev.input] };
    });
  };

  render() {
    return (
      <Page>
        <Body>
          <Container>
            <Form onSubmit={this.onSubmit}>
              <input type="text" value={this.state.input} onChange={this.onChange} />
              <Button type="submit">Submit</Button>
            </Form>
            <Container>
              <ul>
                {this.state.list.map((string) => (
                  <li key={string} style={{ color: "green" }}>
                    {string}
                  </li>
                ))}
              </ul>
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
