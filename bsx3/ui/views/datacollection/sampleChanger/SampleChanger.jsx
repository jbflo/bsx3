
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Nav, Button } from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
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
  }

  toggleCollapse = () => {
    if (this.buffertable.style.height !== '0px') {
      this.buffertable.style.height = '0px';
    } else {
      this.buffertable.style.height = `${this.buffertable.scrollHeight}px`;
    }
  }

  render() {
    return [
      <div className="sc container-fluid">
        <div className="wrapsc">
          {/* Buffer Table Collapse */}
          <div className="panel-heading" style={{ marginBottom: '5px' }}>
            <Button variant="contained" onClick={this.toggleCollapse}>
              Buffer Table
              <i className="fas fa-arrow-circle-down" style={{ marginLeft: '5px' }} />
            </Button>
          </div>
          <div
            ref={(ref) => { this.buffertable = ref; }}
            style={{
              overflow: 'hidden',
              transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
          >
            <BufferTable />
          </div>
          {/* Sample Table  */}
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
          <SampleTable />
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
