import React from 'react'
import {Card, CardActions, CardHeader, CardText, TextField} from "material-ui";

export default class Ticket extends React.Component {
    componentWillMount()
    {
        if (!localStorage.getItem('User'))
        {
            this.props.history.push("/login");
            return ;
        }
    }
    render() {
            return <TicketCard/>
    }
}

const styles = {
    leftCard: {
        float: 'left'
    },
    rightCard: {
        float: 'right'
    }
}

const TicketCard = () => (
<div>
    <Card style={styles.leftCard}>
        <CardHeader>
            Ticket
        </CardHeader>
        <CardText>
            <TextField
                hintText="Hint Text"
                floatingLabelText="Floating Label Text"
            />
            <br/>
            <TextField
                hintText="Hint Text"
                floatingLabelText="Floating Label Text"
            />
            <br/>
            <TextField
                hintText="Hint Text"
                floatingLabelText="Floating Label Text"
            />
            <br/>
            
        </CardText>
        <CardActions>

        </CardActions>
    </Card>
    <Card style={styles.rightCard}>
        <CardHeader>
            Ticket Comments
        </CardHeader>
        <CardText>

        </CardText>
        <CardActions>

        </CardActions>
    </Card>
</div>
);