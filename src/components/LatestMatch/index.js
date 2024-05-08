// Write your code here
import './index.css'

const LatestMatch = props => {
  const {details} = props

  return (
    <div className="latest-match">
      <div className="bx-1">
        <div className="details">
          <p>{details.competing_team}</p>
          <p className="title">{details.date}</p>
          <p>{details.venue}</p>
          <p>{details.result}</p>
        </div>
        <img
          src={details.competing_team_logo}
          alt={`latest match ${details.competing_team}`}
        />
      </div>
      <hr />
      <div className="bx-2">
        <p className="title">First Innings</p>
        <p>{details.first_innings}</p>
        <p className="title">Second Innings</p>
        <p>{details.second_innings}</p>
        <p className="title">Man Of The Match</p>
        <p>{details.man_of_the_match}</p>
        <p className="title">Umpires</p>
        <p>{details.umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
