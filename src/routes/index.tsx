import React from "react"
import { Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/home"

export const AppRoutes: React.FC = props => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
		</Routes>
	)
}
