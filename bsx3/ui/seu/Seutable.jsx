
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import './seu.css';

const { ExportCSVButton } = CSVExport;
const columns = [{
  dataField: 'id',
  text: 'No.'
}, {
  dataField: 'folder',
  text: 'Folder'
}, {
  dataField: 'samplename',
  text: 'Sample Name',
  filter: textFilter() // apply text filter
},
{
  dataField: 'concentration',
  text: 'Concentration'
},
{
  dataField: 'plate',
  text: 'Plate'
},
{
  dataField: 'row',
  text: 'Row'
},
{
  dataField: 'frame',
  text: 'Frame No.'
},
{
  dataField: 'exposuretime',
  text: 'Exposure Time'
},
{
  dataField: 'attenuation',
  text: 'Attenuation'
},
{
  dataField: 'buffer',
  text: 'Buffer'
},
{
  dataField: 'flow',
  text: 'Flow'
},
{
  dataField: 'temp ',
  text: 'Temp'
}];

const queueData = [];

const expandRow = {
  renderer: row => (
    <div>
      <p>
...
        {row.text}
..
      </p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  ),
  showExpandColumn: true
};
class Seutable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return [
      <ToolkitProvider
        keyField="id"
        data={queueData}
        columns={columns}
        exportCSV={{ onlyExportSelection: true, exportAll: true }}
      >
        {
            props => (
              <div>
                <ExportCSVButton {...props.csvProps}>Export CSV!</ExportCSVButton>
                <BootstrapTable
                  bootstrap4
                  hover
                  caption="Queue Name"
                  caption-side="top"
                  ref={(ref) => { this.node = ref; }}
                  keyField="id"
                  data={queueData}
                  columns={columns}
                  cellEdit={cellEditFactory({ mode: 'click' })}
                  filter={filterFactory()}
                  pagination={paginationFactory()}
                  selectRow={{ mode: 'checkbox', clickToSelect: true }}
                  expandRow={expandRow}
                  noDataIndication="this Table is Empty for now"
                />
              </div>
            )
          }
      </ToolkitProvider>,
    ];
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seutable);
