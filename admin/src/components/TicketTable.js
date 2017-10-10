import React from 'react'
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";

const appTokenKey = "appToken";

export class TicketTable extends React.Component {

    constructor(props) {
       super(props)

       this.state = {
           tableData: [],
           selectedRows: 0
       }

       this.onRowSelection = this.onRowSelection.bind(this);
     }

    setTableData() {
        var temp = [];

        //if the logged in user is tech
        if (this.props.assignedTo != null)
        {
            fetch('http://localhost/WebDBAss2/webfiles/public/api/comments/getAllTicketsAssigned/' + this.props.assignedTo)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    tableData: json
                });
            })
        }
        else {
            fetch('http://localhost/WebDBAss2/webfiles/public/api/tickets/returnAll')
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        tableData: json
                    });
                })
        }
    }

    componentWillMount()
    {
        //Before component mounts, get table data
        this.setTableData();
    }

    onRowSelection(rows)
    {
        this.setState({selectedRows: rows}, () => this.tableBody.setState({ selectedRows: rows }));
    }

    getTicketID()
    {
        if (this.state.tableData && this.state.tableData.length > 0)
        {
            var id = this.state.tableData[this.state.selectedRows].id;
            return "ticket/" + id
        }

        return '';
    }

    render()
    {
        return (
        <div style={style.paper}>
            <RaisedButton style={style.button} label="View" href={'/' + this.getTicketID()}/>

            <Table style={style.table} onRowSelection={this.onRowSelection}>
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
                <TableBody ref={(tableBody) => { this.tableBody = tableBody; }}>
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
        </div>
                )
                }
}
const style = {
    paper: {
        textAlign: "center",
        align: "center"
    },
    button: {
        margin: 10,
        textAlign: 'right',
        display: 'inline-block'
    },
    table: {
        margin: 20,
        width: "90%",
        align: "center"
    }
};
