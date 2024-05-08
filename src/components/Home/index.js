// Write your code here
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import TeamCard from "../TeamCard";
import "./index.css";

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://apis.ccbp.in/ipl");
      const list = await response.json();
      const teamsList = list.teams.map((item) => ({
        name: item.name,
        id: item.id,
        teamImageUrl: item.team_image_url,
      }));
      setTeams(teamsList);
      setIsLoading(false);
    };

    getData();
  }, []);

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
          <Oval color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <ul className="container">
          {teams.map((item) => (
            <TeamCard itemDetails={item} key={item.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
