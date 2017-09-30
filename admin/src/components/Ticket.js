import React from 'react'

export default class Ticket {
    componentWillMount()
    {
        if (!localStorage.getItem('User'))
        {
            this.props.history.push("/login");
            return;
        }
    }
    render() {

    }
}