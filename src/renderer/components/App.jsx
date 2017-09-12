import React from "react";
import { ipcRenderer } from "electron";
import {Grid, Row, Panel, Table, Button, FormControl, Col, Label} from 'react-bootstrap';


export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      name: "kyeongrok",
      status: "ready"

    };
  }
  componentDidMount() {
    ipcRenderer.on("REQUEST_TEXT", () => {
      ipcRenderer.send("REPLY_TEXT", this.state.name);
    });
    ipcRenderer.on("SEND_TEXT", (_e, text) => {
      this.setState({ text });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  handleClickButton(event){
    ipcRenderer.on("SEND_TEXT", (_e, text) => {
      this.setState({ text });
    });

  }
  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid">
            <Panel>

              <p>{this.state.name}</p>
              <p>{this.state.status}</p>
              <p>hello</p>

              <button onClick={(event)=>this.handleClickButton(event)}>hello</button>
            </Panel>
          </Row>

        </Grid>
      </div>
    )
  }
}