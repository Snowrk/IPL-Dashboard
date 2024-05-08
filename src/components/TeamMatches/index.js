// Write your code here
import {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Legend, Cell} from 'recharts'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

const colors = {
  RCB: ['#a4261d', '#1e293b'],
  KKR: ['#1e293b', '#a4261d'],
  KXP: ['#d91c1f', '#5755a7'],
  CSK: ['#f7db00', '#5755a7'],
  RR: ['#da237b', '#13418b'],
  MI: ['#13418b', '#f26d22'],
  SH: ['#d91c1f', '#f26d22'],
  DC: ['#4f5db0', '#0f172a'],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// const MyPie = props => {
//   const {data1} = props
//   return (
//     <PieChart width={350} height={300}>
//       <Pie
//         data={data1}
//         dataKey="value"
//         cx="50%"
//         cy="50%"
//         startAngle={0}
//         endAngle={360}
//         innerRadius={50}
//         outerRadius={80}
//         label
//       >
//         <Cell name="Won" fill={COLORS[0]} />
//         <Cell name="Lost" fill={COLORS[1]} />
//         <Cell name="Draw" fill={COLORS[2]} />
//       </Pie>
//       <Legend layout="vertical" verticalAlign="middle" align="right" />
//     </PieChart>
//   )
// }

// const RADIAN = Math.PI / 180
// const renderCustomizedLabel = props => {
//   const {cx, cy, midAngle, innerRadius, outerRadius, value, name} = props
//   console.log(props)
//   const radius = innerRadius + (outerRadius - innerRadius) + 30
//   const x = cx + radius * Math.cos(-midAngle * RADIAN)
//   const y = cy + radius * Math.sin(-midAngle * RADIAN)

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? 'start' : 'end'}
//       dominantBaseline="central"
//     >
//       {`${value} ${name[0].toUpperCase()}`}
//     </text>
//   )
// }

const Match = props => {
  const {matchDetails, dataList} = props
  console.log(matchDetails)
  return (
    <div className="div">
      <Link to="/" className="link">
        <button type="button">Back</button>
      </Link>
      <img src={matchDetails.team_banner_url} alt="team banner" />
      <h1>Latest Matches</h1>
      <LatestMatch details={matchDetails.latest_match_details} />
      <h1>Statistics</h1>
      <PieChart width={350} height={300} data-testid='chart'>
        <Pie
          data={dataList}
          dataKey="value"
          cx="50%"
          cy="50%"
          startAngle={0}
          endAngle={360}
          innerRadius={50}
          outerRadius={80}
          label
        >
          <Cell name="Won" fill={COLORS[0]} />
          <Cell name="Lost" fill={COLORS[1]} />
          <Cell name="Draw" fill={COLORS[2]} />
        </Pie>
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
      <ul className="recent-matches">
        {matchDetails.recent_matches.map(item => (
          <MatchCard details={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

const TeamMatches = props => {
  const [matchDetails, setMatchDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [dataList, setDataList] = useState([])
  const myEl = useRef(null)

  useEffect(() => {
    const {match} = props
    const {params} = match
    const {id} = params
    const [color1, color2] = colors[id]

    const getData = async () => {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const obj = await response.json()
      setMatchDetails(obj)
      setIsLoading(false)
      let won = 0
      let lost = 0
      let draw = 0
      for (let i = 0; i < obj.recent_matches.length; i += 1) {
        if (obj.recent_matches[i].match_status === 'Won') {
          won += 1
        } else if (obj.recent_matches[i].match_status === 'Lost') {
          lost += 1
        } else {
          draw += 1
        }
      }
      setDataList([
        {name: 'Won', value: won},
        {name: 'Lost', value: lost},
        {name: 'Draw', value: draw},
      ])
    }

    myEl.current.style.setProperty('--color1', color1)
    myEl.current.style.setProperty('--color2', color2)
    getData()
  }, [props])

  return (
    <div className="bg-1" ref={myEl}>
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <Match matchDetails={matchDetails} dataList={dataList} />
      )}
    </div>
  )
}

export default TeamMatches
