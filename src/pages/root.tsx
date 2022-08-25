import React, { useState } from "react"
import { Navbar } from "../components/navbar"

interface RootPageProps {
	header: string
	cn?: string
	children?: React.ReactNode
}

export const RootPage: React.FC<RootPageProps> = props => {
	const [mode, setMode] = useState("light")

	const toggleMode = (): void => {
		setMode(mode === "light" ? "dark" : "light")
		console.log("hello " + mode)
	}

	return (
		<div className={mode}>
			<Navbar toggle={toggleMode} />
			<div className='main-wrapper'>
				<div id='app' className={props.cn}>
					{props.children}
				</div>
			</div>
		</div>
	)
}
