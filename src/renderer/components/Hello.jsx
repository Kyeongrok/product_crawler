import React from "react";
import { ipcRenderer } from "electron";

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
    console.log("hello23");
    ipcRenderer.on("REQUEST_TEXT", () => {
      ipcRenderer.send("REPLY_TEXT", this.state.name);
    });
    ipcRenderer.on("SEND_TEXT", (_e, text) => {
      this.setState({ text });
    });
  }
  handleClickButton(){

    ipcRenderer.on("REQUEST_TEXT", () => {
      ipcRenderer.send("REPLY_TEXT", this.state.name);
    });
    ipcRenderer.on("SEND_TEXT", (_e, text) => {
      this.setState({ text });
      console.log("hello");
      this.setState({status:"request"})
    });

  }
  render() {
    return (
      <div>

        <p>{this.state.name}</p>
        <p>{this.state.status}</p>
        <p>hello</p>

        <button onClick={(event)=>this.handleClickButton(event)}>hello</button>
      </div>
    )
  }
}