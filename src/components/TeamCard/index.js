// Write your code here
import Link from 'next/link'
import './index.css'

const TeamCard = props => {
  const {itemDetails} = props
  const {id, name, teamImageUrl} = itemDetails

  return (
    <li className="card">
      <Link className="bx" href={`/team-matches/${id}`}>
        <img src={teamImageUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
