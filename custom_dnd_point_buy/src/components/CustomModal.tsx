import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

type ModalProps = {
    visible: boolean,
    close : () => void,
    setPrices: (value:any)=>void,
    setPoints: (value:any)=>void,
    resetStats: (value:any)=>void
};

export default function CustomModal({ visible, close, setPrices, setPoints, resetStats } : ModalProps) {
    const handleSubmit = (event : any) => {
        event.preventDefault();

        const min_value = event.target.min.value;
        const points_value = event.target.points.value;
        const prices_value = event.target.prices.value;
        
        const prices_arr = prices_value.split(",").map((str : string) => parseInt(str.trim()));
        const prices : {[a:number]:number} = {};
        for (let i : number = 0; i < prices_arr.length; i++) {
            prices[i + parseInt(min_value)] = prices_arr[i];
        }
        
        setPoints(parseInt(points_value));
        setPrices(prices);
        resetStats(parseInt(min_value));
        close();
    }

    return (<Modal show={visible} onHide={close} className="m-100">
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit} className="grid gap-3">
                <Form.Group className="mb-3" >
                    <Form.Label for="points">Total Allotted Points</Form.Label>
                    <Form.Control type="number" defaultValue={75} min="0" id="points" required/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label for="min">Minimum Ability Score</Form.Label>
                    <Form.Control type="number" defaultValue={8} min="0" max="20" id="min" required/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label for="prices">Upgrade Prices</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter numbers as a comma separated list..." id="prices" required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>);
}