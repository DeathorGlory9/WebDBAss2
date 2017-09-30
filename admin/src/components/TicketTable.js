import React from 'react'
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";

const tableData = [
    {
        id: 'UID1',
        issueTitle: 'Fire',
        os: 'iOS',
        description: 'My computer is on fire. Please send help.',
        status: 'Pending',
        priority: '1',
        escalation: '1',
        assignedTo: 'Bob'

    },
    {
        id: 'UID2',
        issueTitle: 'Computer is blank',
        os: 'iOS',
        description: 'Do i need the cable to be plugged in?',
        status: 'Pending',
        priority: '1',
        escalation: '1',
        assignedTo: 'Bob'
    }];

export const TicketTable = () => (
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
                {tableData.map((row, index) => (<TableRow key={index}>
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
);
