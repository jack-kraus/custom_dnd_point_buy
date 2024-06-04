import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from "react";

type ModalProps = {
    visible: boolean,
    close : () => void,
    prices: any,
    setPrices: (value:any)=>void,
    setPoints: (value:any)=>void,
    resetStats: (value:any)=>void,
    points: number
};

export default function CustomModal({ visible, close, prices, setPrices, points, setPoints, resetStats } : ModalProps) {
    const [error, setError] = useState("");

    const validatePrices = (str : string) => {
        const prices_arr = str.split(",").map((str : string) => parseInt(str.trim()));
        if (!prices_arr.length) setError("Must be at least one value!");
        else if (prices_arr.some(isNaN)) setError("Each entry must be a valid number");
        else if (!prices_arr.every((val)=>Number.isInteger(val) && val >= 0))
            setError("Prices must all be non-negative integers");
        else if (!prices_arr.every((val : number, ind : number) => ind ===0 || val >= prices_arr[ind-1]))
            setError("Prices must be in ascending order");
        else { setError(""); return prices_arr; }
        console.log(error);
        return null;
    };

    const handleSubmit = (event : any) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.checkValidity() === false) {
            return;
        }

        const min_value = parseInt(event.target.min.value);
        const points_value = parseInt(event.target.points.value);
        const prices_value = event.target.prices.value;
        
        const prices_arr = validatePrices(prices_value);
        if (!prices_arr) return;
        else if (prices_arr[0] * 6 > points_value) {
            setError("Not enough points for first cost, try making the first item 0");
            return;
        } else { setError(""); }

        const prices : {[a:number]:number} = {};
        for (let i : number = 0; i < prices_arr.length; i++) {
            prices[i + min_value] = prices_arr[i];
        }
        
        setPoints(points_value);
        resetStats(min_value);
        setPrices(prices);
        close();
    }

    return (<Modal show={visible} onHide={close} className="m-100">
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate onSubmit={handleSubmit} className="grid gap-3" validated={true}>
                <Form.Group className="mb-3" >
                    <Form.Label for="points">Total Allotted Points</Form.Label>
                    <Form.Control type="number" defaultValue={points} min="0" id="points" required/>
                    <Form.Control.Feedback type="invalid">Please enter a non-negative integer</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label for="min">Minimum Ability Score</Form.Label>
                    <Form.Control type="number" defaultValue={Math.min(...Object.keys(prices).map(Number))} min="0" max="20" id="min" required/>
                    <Form.Control.Feedback type="invalid">Please enter an integer between 0 and 20</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label for="prices">Upgrade Prices</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        defaultValue={Object.values(prices).join(", ")}
                        placeholder="Enter numbers as a comma separated list..." id="prices"
                        isInvalid={true}
                        onChange={(e)=>validatePrices(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>);
}