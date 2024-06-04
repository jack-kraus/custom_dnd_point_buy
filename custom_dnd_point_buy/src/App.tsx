import { useState, createContext } from 'react';

import StatItem from './components/StatItem';
import { stats as stat_arr, prices as price_dict } from './data/data';
import './App.css';
import CustomModal from './components/CustomModal';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import gear from "./assets/gear.svg";

const default_stats : { [stat:string] : number } = {};
stat_arr.forEach(stat => default_stats[stat] = 8);

export const StateContext : any = createContext(null);

function App() {
  // State variables
  const [stats, setStats] = useState(default_stats); // values of stat dropdowns, controlled
  const [visible, setVisible] = useState(false); // for modal
  const [prices, setPrices] = useState(price_dict); // price dictionary
  const [points, setPoints] = useState(75); // total points available

  // Takes in a key, and returns a fuunction that takes in a value and updates the appropriate stat based on the key
  function updateStat(stat : string) {
    return (amount : number) => {
      const newStats = {...stats};
      newStats[stat] = amount;
      setStats(newStats);
    }
  }

  // set all stats to one minimum value
  function resetStats(value : number) {
    const newStats = {...stats};
    for (const key in newStats) {
      newStats[key] = value;
    }
    setStats(newStats);
  }

  // get remaining points by subtracting all costs
  function getPoints() {
    return points - Object.values(stats).map(value => prices[value]).reduce((a,b)=>a+b);
  }

  return (
    <>
      <CustomModal
        visible={visible}
        close={()=>setVisible(false)}
        setPrices={setPrices}
        setPoints={setPoints}
        resetStats={resetStats}
        points={points}
        prices={prices}
      />
      <h2>Points Remaining<br/>{getPoints()}/{points}</h2>
      <StateContext.Provider value={{prices:prices, points:getPoints()}}>
        <Table>
          <tr>
            {Object.keys(stats).map((name, ind)=> <th key={ind}>{name}</th>)}
          </tr>
          <tr>
            {Object.keys(stats).map((name, ind)=> <td key={ind}>
              <StatItem
                value={stats[name]}
                update={updateStat(name)}
              />
            </td>)}
          </tr>
        </Table>
      </StateContext.Provider>
      <Button onClick={()=>setVisible(true)}><img src={gear} style={{filter: "brightness(0) invert(1)"}}></img></Button>
    </>
  );
}

export default App;
