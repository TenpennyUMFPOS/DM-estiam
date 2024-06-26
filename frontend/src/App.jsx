import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

function App() {
  axios.defaults.withCredentials = true;
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    const fetchScoreboard = async () => {
      try {
        const response = await axios.get('https://dm-estiam-api.vercel.app/players/scoreboard');
        setScoreboard(response.data);
      } catch (error) {
        console.error('Error fetching scoreboard:', error);
      }
    };

    fetchScoreboard();
  }, []);

  return (
    <div className='h-screen w-full bg-black flex flex-col'>
      <div className='text-white self-center bg w-full flex justify-center'>
        <div className='self-center items-center w-5/6'>

          {scoreboard.map((player, index) => (
            <div className='flex flex-row justify-evenly m-4 font-monospace font-extrabold text-white hover:text-green hover:cursor-pointer hover:border-b-2' key={player._id}>
              <p>{index + 1}. </p>
              <p>{player.username}</p>
              <p> - Score: {player.score}</p>
            </div>
          ))}

          {/* Display a message if scoreboard is empty */}
          {scoreboard.length === 0 && (
            <p className="text-white">No scoreboard data available.</p>
          )}

        </div>
      </div>
    </div>

  );
}

export default App;
