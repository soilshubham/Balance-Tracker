import React, { useEffect, useState } from "react"
import { RootPage } from "./root"
import { getBalance } from "../api"
import { BalanceObject } from "../common/types"
import "./styles.scss"

export const HomePage: React.FC = props => {
	const [tokenBalances, setTokenBalances] = useState<BalanceObject[]>()
	const [addAddressModal, setAddAddressModal] = useState(false)
	const [inpAddress, setInpAddress] = useState("")
	const [addressList, setAddressList] = useState<string[]>([])

	const intervalTime = 20000

	const handelAddAddress = (e: any): void => {
		e.preventDefault()
		console.log(tokenBalances)

		if (localStorage.getItem("addressList") === null) {
			const localList = [inpAddress]
			localStorage.setItem("addressList", JSON.stringify(localList))
			setAddressList(localList)
		} else {
			const localList = JSON.parse(
				localStorage.getItem("addressList") as string
			)
			localList.push(inpAddress)
			localStorage.setItem("addressList", JSON.stringify(localList))
			setAddressList(localList)
		}

		setAddAddressModal(false)
		setInpAddress("")
	}

	const loadAddressList = (): void => {
		if (localStorage.getItem("addressList") != null) {
			const localList = JSON.parse(
				localStorage.getItem("addressList") as string
			)
			setAddressList(localList)
		}
	}

	useEffect(() => {
		loadAddressList()
	}, [])

	useEffect(() => {
		if (addressList !== undefined && addressList.length > 0) {
			getBalance(addressList)
				.then(balance => {
					setTokenBalances(balance)
				})
				.catch(err => {
					console.log(err)
				})
		}
		const interval = setInterval(() => {
			console.log("Logs every minute")
		}, intervalTime)

		return () => clearInterval(interval)
	}, [addressList])

	return (
		<>
			{addAddressModal && (
				<div className='modal-overlay'>
					<div className='modal'>
						<div className='modal-header'>
							<span className='title'>Add Address</span>
							<button onClick={() => setAddAddressModal(false)}>
								X
							</button>
						</div>
						<div className='modal-body'>
							<p>
								Enter the address you want to add to your wallet
							</p>
							<input
								type='text'
								className='inpt-address'
								placeholder='Wallet Address'
								value={inpAddress}
								onChange={e => setInpAddress(e.target.value)}
							/>
							<button onClick={handelAddAddress}>
								Add Address
							</button>
						</div>
					</div>
				</div>
			)}

			<RootPage header='Home' cn='home'>
				<header className='page-header'>Balance Tracker</header>
				<main className='content'>
					<div className='btn-group'>
						<button onClick={() => setAddAddressModal(true)}>
							Add Address
						</button>
						<button disabled>Edit Address List</button>
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
							{/* {tokenBalances != null
								? tokenBalances?.map((bal, indx) => {
										return (
											<tr key={indx}>
												<td>{addressList[indx]}</td>
												<td>
													{tokenBalances[indx]?.DAI}
												</td>
												<td>
													{tokenBalances[indx]?.USDT}
												</td>
												<td>
													{tokenBalances[indx]?.LINK}
												</td>
											</tr>
										)
								  })
								: null} */}
							<tr>
								<td>
									0x4f0d6e68eebade804932c67fb2ee074a02379666
								</td>
								<td>10000000000000000.0000000000</td>
								<td>0</td>
								<td>0</td>
							</tr>
							<tr>
								<td>
									0x2f45ghj6ekkbade804932c67fb2ee074a02376374
								</td>
								<td>0</td>
								<td>546738272.000000000000</td>
								<td>0</td>
							</tr>
							<tr>
								<td>
									0x2f45ghj6ekkbade804932c67fb2ee074a02376374
								</td>
								<td>0</td>
								<td>0</td>
								<td>546738272.000000000000</td>
							</tr>
						</tbody>
					</table>
				</main>
			</RootPage>
		</>
	)
}
