import logo from './logo.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const App = () => {
	const [list, setList] = useState([])
	const [randomCompanyName, setRandomCompanyName] = useState('')

	const getData = async () => {
		try {
			const data = await axios({
				method: 'get',
				url: 'http://localhost:5000',
			})
			const temp = data.data.companies

			const temp2 = temp.map((it) => it.company)
			console.log(temp2.sort())

			setList(data.data.companies)
		} catch (error) {}
	}

	const handleCompanyClick = (item, i) => {
		const temp = [...list]
		temp[i]['visibitlity'] = true
		setList(temp)
	}

	useEffect(() => {
		getData()
	}, [])

	const handleRandomBtnClick = () => {
		const temp = list.map((item) => item.company)

		const data = temp[Math.floor(Math.random() * temp.length)]
		setRandomCompanyName(data)
	}

	const companyList = list.map((item, i) => {
		return (
			<div className='card d-f f-c ' key={i}>
				<div onClick={() => handleCompanyClick(item, i)}>
					Company: {item.company}
				</div>
				{item?.visibitlity && (
					<>
						<div>Category: {item.category}</div>
						<div>Ceo: {item.ceo}</div>
						<div>Latitude: {item.hq_latitude}</div>
						<div>longitude: {item.hq_longitude}</div>
						<div>
							Logo :{' '}
							<img
								src={`https://interview.sfo3.digitaloceanspaces.com/${item.logo_path}`}
								width='50'
								alt='logo'
								height='50'
							></img>
						</div>
					</>
				)}
			</div>
		)
	})

	return (
		<div className='App'>
			{companyList}
			<br></br>
			<br></br>
			<button onClick={handleRandomBtnClick}>Get Random Company Name</button>
			<br></br>
			<br></br>
			<h2>Random Company Name: {randomCompanyName}</h2>
			<br></br> <br></br>
			<br></br>
			<br></br>
			<br></br>
		</div>
	)
}

export default App
