import { range } from "../data/data";

type statProps = {
    name : string,
    value : number,
    update : (a:number) => void ,
    prices : {[value:number] : number},
    points : number
};

export default function StatItem({ name, value, update, prices, points } : statProps) {  
    function difference(num : number) {
        const diff = prices[value] - prices[num];
        if (diff === 0) return "";
        else if (diff < 0) return `(${diff})`;
        else return `(+${diff})`;
    }
    
    return (
        <>
            <p>{name}</p>
            <select
                defaultValue={8}
                onChange={(e) => update(parseInt(e.target.value))}
                value={value}
            >
                {range(8, 17).map(num => <option value={num} disabled={prices[value] - prices[num] + points < 0}>{num} {difference(num)}</option>)}
            </select>
        </>
    );
}