import React, { useEffect } from "react"
import { RootPage } from "./root"
import { getBalance } from "../api"

import "./styles.scss"

export const HomePage: React.FC = props => {
	useEffect(() => {
		getBalance("DAI")
			.then(balance => {
				console.log(balance)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<RootPage header='Home' cn='home'>
			<header className='page-header'>Balance Tracker</header>
			<main className='content'>
				<div className='btn-group'>
					<button>Add Address</button>
					<button>Edit Address List</button>
				</div>

				<table className='tbl-bal'>
					<thead>
						<tr>
							<th>Address</th>
							<th>ETH</th>
							<th>DAI</th>
							<th>USDT</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>0x...</td>
							<td>0.00</td>
							<td>0.00</td>
							<td>0.00</td>
						</tr>
					</tbody>
				</table>
			</main>
		</RootPage>
	)
}
