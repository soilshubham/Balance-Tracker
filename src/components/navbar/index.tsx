import React from "react"
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md"
import "./navbar.scss"

interface NavbarProps {
	toggle: () => void
	mode: string
}
export const Navbar: React.FC<NavbarProps> = ({ toggle, mode }) => {
	return (
		<nav id='navbar'>
			<div className='wrapper'>
				<div className='brand'>Balance Tracker</div>
				<div className='dark-mode'>
					<button onClick={toggle}>
						{mode === "light" ? (
							<MdOutlineDarkMode />
						) : (
							<MdLightMode />
						)}
					</button>
				</div>
			</div>
		</nav>
	)
}
