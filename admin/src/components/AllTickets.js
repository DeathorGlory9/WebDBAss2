import React from 'react';
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";
import {TicketTable} from './TicketTable';


const appTokenKey = "appToken";

export default class Home extends React.Component
{
	state = {
		tableData: []
	};

	setTableData()
	{
		var temp = [];
		fetch('http://localhost/WebDBAss2/webfiles/public/api/tickets/returnAll')
		.then(response => response.json())
      .then(json => {
			this.setState({
				tableData: json
			});
		})
	}

	componentWillMount()
	{
		if (!localStorage.getItem('User'))
		{
			this.props.history.push("/login");
			return;
		}
		this.setTableData();
	}

	render()
	{
		return (
			<div>
          <RaisedButton label="Assign"/>
          <RaisedButton label="Delete"/>

          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHeaderColumn>ID</TableHeaderColumn>
                      <TableHeaderColumn>Issue Title</TableHeaderColumn>
                      <TableHeaderColumn>Operating System</TableHeaderColumn>
                      <TableHeaderColumn>Description</TableHeaderColumn>
                      <TableHeaderColumn>Status</TableHeaderColumn>
                      <TableHeaderColumn>Priority</TableHeaderColumn>
                      <TableHeaderColumn>Escalation</TableHeaderColumn>
                      <TableHeaderColumn>Assigned To</TableHeaderColumn>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {this.state.tableData.map((row, index) => (<TableRow key={index}>
                      <TableRowColumn>{row.id}</TableRowColumn>
                      <TableRowColumn>{row.issueTitle}</TableRowColumn>
                      <TableRowColumn>{row.os}</TableRowColumn>
                      <TableRowColumn>{row.description}</TableRowColumn>
                      <TableRowColumn>{row.status}</TableRowColumn>
                      <TableRowColumn>{row.priority}</TableRowColumn>
                      <TableRowColumn>{row.escalation}</TableRowColumn>
                      <TableRowColumn>{row.assignedTo}</TableRowColumn>
                  </TableRow>))}
              </TableBody>
          </Table>
      </div>)
	}
}
