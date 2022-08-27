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

	const intervalTime = 30000

	const handelAddAddress = (e: any): void => {
		e.preventDefault()

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

	const loadBalances = (): void => {
		if (addressList !== undefined && addressList.length > 0) {
			getBalance(addressList)
				.then(balance => {
					setTokenBalances(balance)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	useEffect(() => {
		loadAddressList()
	}, [])

	useEffect(() => {
		loadBalances()
		const interval = setInterval(() => {
			loadBalances()
		}, intervalTime)

		return () => clearInterval(interval)
	}, [addressList])

	return (
		<>
			<RootPage header='Home' cn='home'>
				{/* Modal to add new address */}
				{addAddressModal && (
					<div className='modal-overlay'>
						<div className='modal'>
							<div className='modal-header'>
								<span className='title'>Add Address</span>
								<button
									onClick={() => setAddAddressModal(false)}
								>
									X
								</button>
							</div>
							<div className='modal-body'>
								<p>
									Enter the address you want to add to your
									wallet
								</p>
								<input
									type='text'
									className='inpt-address'
									placeholder='Wallet Address'
									value={inpAddress}
									onChange={e =>
										setInpAddress(e.target.value)
									}
								/>
								<button onClick={handelAddAddress}>
									Add Address
								</button>
							</div>
						</div>
					</div>
				)}

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
								<th>DAI</th>
								<th>USDT</th>
								<th>LINK</th>
							</tr>
						</thead>
						<tbody>
							{(addressList.length === 0 ||
								addressList === undefined) && (
								<tr>
									<td>No Address Added</td>
								</tr>
							)}
							{tokenBalances != null
								? tokenBalances?.map((bal, indx) => {
										return (
											<tr key={indx}>
												<td className='adrs'>
													{addressList[indx]}
												</td>
												<td>{bal?.DAI}</td>
												<td>{bal?.USDT}</td>
												<td>{bal?.LINK}</td>
											</tr>
										)
								  })
								: addressList.map((adrs, indx) => (
										<tr key={indx} className='loading'>
											<td className='adrs'>{adrs}</td>
											<td>
												<div className='dot-flashing'></div>
											</td>
											<td>
												<div className='dot-flashing'></div>
											</td>
											<td>
												<div className='dot-flashing'></div>
											</td>
										</tr>
								  ))}
						</tbody>
					</table>
				</main>
			</RootPage>
		</>
	)
}
