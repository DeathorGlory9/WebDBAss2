import React from 'react'

const appTokenKey = "appToken";

export default class Home extends React.Component
{
	componentWillMount() {
		 if (!localStorage.getItem(appTokenKey)) {
			  this.props.history.push("/login");
			  return;
		 }
	}

	render()
	{
		return <HomePage/>;
	}
}

const HomePage = () => (
  <div>
    <h1>Home page</h1>
  </div>
)
