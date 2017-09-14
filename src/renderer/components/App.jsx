import React, {Component} from 'react';
import {ipcRenderer} from 'electron';
import {Grid, Row, Col, Panel, Table, Button, Label} from 'react-bootstrap';
import Progress from './Progress.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      site: '',
      list: [],
      status: 'ready'
    };
  }

  componentDidMount() {
    ipcRenderer.on('REQUEST_TEXT', () => {
      console.log("request text");
      ipcRenderer.send('REPLY_TEXT', this.state.name);
    });
    ipcRenderer.on('SEND_TEXT', (_e, text) => {
      try {
        const json = JSON.parse(text);
        this.setState({list: json.list, text: text, status: 'ok'});
      } catch (e) {
        console.log(e);
      }
    });
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }
  handleClickDigitecButton() {
    console.log('click Button');
    this.setState({status: 'request', site:'Digitec', list:[]});
    ipcRenderer.send('REQUEST_EVENT', 'clickDigitecButton');
  }

  handleClickConformaButton() {
    console.log('click Conforma Button');
    this.setState({status: 'request', site:'Conforma', list:[]});
    ipcRenderer.send('REQUEST_EVENT', 'clickConformaButton');
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid">
            <Panel>
              <Row>
                <Col xs={3} md={3}>
                  <h4><Label>개수:{this.state.list.length}</Label></h4>
                </Col>
                <Col xs={3} md={3}><Button bsStyle="primary" onClick={(event) => this.handleClickDigitecButton(event)}>Digitec</Button></Col>
                <Col xs={3} md={3}><Button bsStyle="primary" onClick={(event) => this.handleClickConformaButton(event)}>Conforma</Button></Col>
              </Row>
            </Panel>

            <Panel header={this.state.site} bsStyle="primary">
              {this.state.status === 'ready'?<p>'사용방법 : 원하는 사이트의 버튼을 누릅니다.'</p>:null}
              {this.state.status === 'request'?<Progress/>:null}
              {this.state.list.length > 0 ? <ProductInfoTable data={this.state.list}/> : null}
            </Panel>
          </Row>
        </Grid>
      </div>
    )
  }
}

class TrProduct extends Component {
  render() {
    console.log(this.props.item);
    return (
      <tr key={Math.random()}>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.price}</td>
        <td>{this.props.item.appendix}</td>
      </tr>
    )
  }
}

class ProductInfoTable extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
        <tr>
          <td>제품명</td>
          <td>가격</td>
          <td>세일가</td>
        </tr>
        </thead>
        <tbody>
        {this.props.data.map(item => <TrProduct key={Math.random()} item={item}/>)}
        </tbody>
      </Table>
    )
  }
}

export default App;