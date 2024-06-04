import { useContext } from "react";
import { StateContext } from "../App";
import Form from 'react-bootstrap/Form';

type statProps = {
    value : number,
    update : (a:number) => void
};

type stateProps = {
    prices : {[value:number] : number},
    points : number
}

export default function StatItem({ value, update } : statProps) {
    const { prices, points } : stateProps = useContext(StateContext);

    function difference(num : number) {
        const diff = prices[value] - prices[num];
        if (diff === 0) return "";
        else if (diff < 0) return `(${diff})`;
        else return `(+${diff})`;
    }
    
    return (
        <>
            <Form.Select
                defaultValue={8}
                onChange={(e) => update(parseInt(e.target.value))}
                value={value}
            >
                {Object.keys(prices).map(Number).map(num => <option value={num} disabled={prices[value] - prices[num] + points < 0}>{num} {difference(num)}</option>)}
            </Form.Select>
            <p>Price: {prices[value]}</p>
        </>
    );
}