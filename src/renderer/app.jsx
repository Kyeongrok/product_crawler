import React from "react";
import { render } from "react-dom";
import MarkdownEditorUI from "./components/MarkdownEditorUI";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

render(<App />, document.getElementById("app"));
