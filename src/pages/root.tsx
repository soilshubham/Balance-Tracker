import React, { useState, useEffect } from "react"
import { Navbar } from "../components/navbar"

interface RootPageProps {
	header: string
	cn?: string
	children?: React.ReactNode
}

export const RootPage: React.FC<RootPageProps> = props => {
	const [mode, setMode] = useState("light")

	const toggleMode = (): void => {
		const modePref = mode === "light" ? "dark" : "light"
		localStorage.setItem("mode", modePref)
		setMode(modePref)
	}

	useEffect(() => {
		if (localStorage.getItem("mode") !== null) {
			const mode = localStorage.getItem("mode")

			if (mode === "dark") setMode(mode)
			else if (mode === "light") setMode("light")
		}
	}, [])

	return (
		<div className={mode}>
			<Navbar toggle={toggleMode} mode={mode} />
			<div className='main-wrapper'>
				<div id='app' className={props.cn}>
					{props.children}
				</div>
			</div>
		</div>
	)
}
