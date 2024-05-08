// Write your code here
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import TeamCard from '../TeamCard'

const Home = () => {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const list = await response.json()
    const teamsList = list.teams.map(item => ({
      name: item.name,
      id: item.id,
      teamImageUrl: item.team_image_url,
    }))
    setTeams(teamsList)
    setIsLoading(false)
  }

  useEffect(() => getData(), [])

  return (
    <div className="bg">
      <div className="logo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        <h1>IPL Dashboard</h1>
      </div>
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <ul className="container">
          {teams.map(item => (
            <TeamCard itemDetails={item} key={item.id} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
