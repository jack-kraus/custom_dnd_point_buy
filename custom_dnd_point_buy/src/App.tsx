import { useState, createContext } from 'react';
import './App.css';
import StatItem from './components/StatItem';
import { stats as stat_arr, prices as price_dict } from './data/data';
import CustomModal from './components/CustomModal';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const default_stats : { [stat:string] : number } = {};
stat_arr.forEach(stat => default_stats[stat] = 8);

export const StateContext : any = createContext(null);
export const ParametersConext : any = createContext(null);

function App() {

  const [stats, setStats] = useState(default_stats);
  const [visible, setVisible] = useState(false); // for modal
  const [prices, setPrices] = useState(price_dict);
  const [points, setPoints] = useState(75);

  function updateStat(stat : string) {
    return (amount : number) => {
      const newStats = {...stats};
      newStats[stat] = amount;
      setStats(newStats);
    }
  }

  function resetStats(value : number) {
    const newStats = {...stats};
    for (const key in newStats) {
      newStats[key] = value;
    }
    setStats(newStats);
  }

  function getPoints() {
    return points - Object.values(stats).map(value => prices[value]).reduce((a,b)=>a+b);
  }

  return (
    <>
      <CustomModal visible={visible} close={()=>setVisible(false)} setPrices={setPrices} setPoints={setPoints} resetStats={resetStats}/>
      <Button onClick={()=>setVisible(true)}>Change Stats</Button>
      <h1>{getPoints()}</h1>
      <StateContext.Provider value={{prices:prices, points:getPoints()}}>
        <table>
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
        </table>
      </StateContext.Provider>
    </>
  );
}

export default App;
