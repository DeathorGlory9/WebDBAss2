import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component
{
	render()
	{
		return <HeaderSection/>;
	}
}

// The Header creates links that can be used to navigate
// between routes.
const HeaderSection = () => (
	<header>
		<div>
			Header
		</div>
		<nav>
			<ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/logout'>Logout</Link></li>
				<li><Link to='/schedule'>Schedule</Link></li>
			</ul>
		</nav>
	</header>
)
