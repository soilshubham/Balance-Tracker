import React from "react"
import "./navbar.scss"

interface NavbarProps {
	toggle: () => void
}
export const Navbar: React.FC<NavbarProps> = ({ toggle }) => {
	return (
		<nav id='navbar'>
			<div className='wrapper'>
				<div className='brand'>Balance Tracker</div>
				<div className='dark-mode'>
					<button onClick={toggle}>Toggle</button>
				</div>
			</div>
		</nav>
	)
}
