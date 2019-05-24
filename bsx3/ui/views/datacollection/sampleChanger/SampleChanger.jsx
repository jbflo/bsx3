
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Nav, Button } from 'react-bootstrap';
import Form, { Label } from 'react-bootstrap/Form';
import SampleTable from './SampleTable';
import BufferTable from './BufferTable';
import SaveMenu from './menu/SaveMenu';
import FolderUploader from './folderDirectory/FolderDirectory';
import ColumnChooser from './tableColumnChooser/ColumnChooser';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './style.css';


class SampleChanger extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() {
    this.buffertable.style.height = '0px';
    this.samplebtn.style.background = '#0097a7';
    this.samplebtn.style.color = ' #FFF';
  }

  toggleCollapseSample = () => {
    this.sampletable.style.height = '0px';
    this.buffertable.style.height = `${this.sampletable.scrollHeight}px`;
    this.bufferbtn.style.background = '#0097a7';
    this.bufferbtn.style.color = '#FFF';
    this.samplebtn.style.color = '#455a64';
    this.samplebtn.style.background = '';
  }

  toggleCollapseBuffer = () => {
    this.buffertable.style.height = '0px';
    this.sampletable.style.height = `${this.sampletable.scrollHeight}px`;
    this.samplebtn.style.background = '#0097a7';
    this.samplebtn.style.color = ' #FFF';
    this.bufferbtn.style.color = '#455a64';
    this.bufferbtn.style.background = '';
  }

  render() {
    return [
      <div className="sc container-fluid">
        <div className="wrapsc">

          {/* Collapse Buffer OR sample Table  */}
          <div className="flexclass divConfig ">
            <div className="scConfig">
              <Button className="collapsebtn" variant="contained" onClick={this.toggleCollapseBuffer} ref={(ref) => { this.samplebtn = ref; }}>
                Sample
                <i className="fas fa-arrow-circle-down" style={{ marginLeft: '5px' }} />
              </Button>
              <Button className="collapsebtn" variant="contained" onClick={this.toggleCollapseSample} ref={(ref) => { this.bufferbtn = ref; }}>
              Buffer
                <i className="fas fa-arrow-circle-down" style={{ marginLeft: '5px' }} />
              </Button>
            </div>
            <div className=" scConfig">
              <span style={{ marginTop: '7px', marginRight: '10px', marginLeft: '10px' }}> Load Data: </span>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control as="select">
                    <option> None (User Define)</option>
                    <option>BSA Calibration</option>
                    <option>Water Calibration</option>
                    <option>From ISPYB</option>
                    <option>From File</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div className=" scConfig">
              <span style={{ marginTop: '7px', marginRight: '10px', marginLeft: '10px' }}> Optimizition: </span>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control as="select">
                    <option>None</option>
                    <option>Sample Temperature</option>
                    <option>Sample Name</option>
                    <option>Buffer</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="panel-heading">
            <SaveMenu className="menesavebtn" />
            <FolderUploader className="folderup" />
            {/* <input className="form-control input_queue-name" "type="text" /> */}
            <span className="mr-auto" />
            <div className="flexclass">
              <div className="flexclass">
                <span className="switchall_text"> Hide Columns : </span>
                <Label className="switchall">
                  <input
                    type="checkbox"
                    className="success"
                    checked
                    onChange={() => {
                      this.togleColumn;
                    }}
                  />
                  <span className="slider round" />
                </Label>
              </div>
              <div className="" title="Choose Column to be display">
                <ColumnChooser />
              </div>
              <div>
                <Button variant="contained" title="Add Table data to Queue" className="btnaddqueue">
                    Add to Queue
                  <i className="fa fa-share-square" style={{ marginLeft: '5px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div
            ref={(ref) => { this.buffertable = ref; }}
            style={{
              overflow: 'hidden',
              transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
          >
            <BufferTable name=" Buffer" />
          </div>
          <div
            className="sampletable"
            ref={(ref) => { this.sampletable = ref; }}
            style={{
              overflow: 'hidden',
              transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
          >
            <SampleTable name=" Sample" />
          </div>
          <Nav style={{ width: '100%', marginTop: '20px', marginLeft: '50px' }}>
            <div style={{ marginRight: '10px' }}>
              <span>
                Plate Viewer will be there
                { ' ' }
                <i className="fas fa-arrow-circle-down" />
              </span>
            </div>
          </Nav>
        </div>
      </div>
    ];
  }
}

function mapStateToProps() {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleChanger);
