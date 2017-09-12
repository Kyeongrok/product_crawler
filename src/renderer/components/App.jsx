import React, {Component} from 'react';
import { ipcRenderer } from 'electron';
import {Grid, Row, Panel, Table} from 'react-bootstrap';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      list:[],
      name: 'kyeongrok',
      status: 'ready'

    };
  }
  componentDidMount() {
    ipcRenderer.on('REQUEST_TEXT', () => {
      ipcRenderer.send('REPLY_TEXT', this.state.name);
    });
    ipcRenderer.on('SEND_TEXT', (_e, text) => {
      console.log(text);
      try {
        const json = JSON.parse(text);
        console.log(json.list);
        this.setState({ list:json.list, text:text });
      } catch (e) {
        console.log(e);
      }


    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  handleClickButton(){
    console.log('click Button');
    // ipcRenderer.sendSync('SEND_TEXT', 'ping');
  }
  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid">
            <Panel>
              <p>{this.state.name}</p>
              <p>{this.state.status}</p>

              <button onClick={(event) => this.handleClickButton(event)}>hello</button>
              {this.state.list.length}

              <ProductInfoTable data={this.state.list} />


            </Panel>
          </Row>

        </Grid>
      </div>
    )
  }
}

class TrProduct2 extends Component {
  render(){
    console.log(this.props.item);
    return(
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
        {this.props.data.map(item => <TrProduct2 item={item}/> )}
        </tbody>
      </Table>
    )
  }
}

export default Hello;