import { useState } from 'react';
import './App.css';
import StatItem from './components/StatItem';
import { stats as stat_arr, prices } from './data/data';

function App() {
  const points = 75;

  const default_stats : { [stat:string] : number } = {};
  stat_arr.forEach(stat => default_stats[stat] = 8);

  const [stats, setStats] = useState(default_stats);

  function updateStat(stat : string) {
    return (amount : number) => {
      const newStats = {...stats};
      newStats[stat] = amount;
      setStats(newStats);
    }
  }

  function getPoints() {
    return points - Object.values(stats).map(value => prices[value]).reduce((a,b)=>a+b);
  }

  return (
    <>
      <h1>{getPoints()}</h1>
      <ul>
        {Object.keys(stats).map((name, ind)=> <li key={ind}>
          <StatItem
            name={name}
            value={stats[name]}
            update={updateStat(name)}
            prices={prices}
            points={getPoints()}
          />
        </li>)}
      </ul>
    </>
  );
}

export default App;
