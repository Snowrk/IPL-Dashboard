// Write your code here
import './index.css'

const MatchCard = props => {
  const {details} = props
  const className = details.match_status === 'Lost' ? 'red' : 'green'
  return (
    <li className="match-card">
      <img
        src={details.competing_team_logo}
        alt={`competing team ${details.competing_team}`}
      />
      <p>{details.competing_team}</p>
      <p>{details.result}</p>
      <p className={className}>{details.match_status}</p>
    </li>
  )
}

export default MatchCard
