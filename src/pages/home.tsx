import React from "react"
import { RootPage } from "./root"
import "./styles.scss"

export const HomePage: React.FC = props => {
	return (
		<RootPage header='Home' cn='home'>
			<header className='page-header'>Balance Tracker</header>
		</RootPage>
	)
}
