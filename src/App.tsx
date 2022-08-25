import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import "./App.scss"

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}

export default App
