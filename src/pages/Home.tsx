import React, { ChangeEvent } from 'react';
import { Image, Button, Form, Container } from 'react-bootstrap';
import { PlannerRow } from '../../typings/PlannerRow';
import { Link } from 'react-router-dom';
import xlsx from 'xlsx';

import logo from '../img/gantt-img.png';

import '../styles/home.css';
import { ILabelInfo } from '../../typings/ILabelInfo';

interface Props {
    data: PlannerRow[];
    labels: ILabelInfo | null;
    selectedLabels: ILabelInfo | null;
    setSelectedLabels: Function;
    setData: Function;
}

const Home: React.FC<Props> = (props) => {
    const readFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
            if (!e.target) return;

            const arrayBuffer = e.target.result;
            const wb = xlsx.read(arrayBuffer, {
                type: 'buffer',
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const json = xlsx.utils.sheet_to_json<PlannerRow>(ws, {
                range: 4,
            });
            props.setData(json);
        };
    };

    return (
        <Container>
            <Image src={logo} rounded fluid />
            <h1 className="title">Gantt Planner</h1>

            {props.data.length > 0 ? (
                <>
                    <div>
                        <ul>
                            {props.labels &&
                                Object.keys(props.labels).map((key) => {
                                    if (props.labels && props.labels[key]) {
                                        const l = props.labels[key];
                                        return (
                                            <Form.Check
                                                key={`${l.label}-${l.count}`}
                                                type="checkbox"
                                                label={l.label}
                                            />
                                        );
                                    }

                                    return <div />;
                                })}
                        </ul>
                    </div>

                    <div className="actions">
                        <Button as={Link} variant="primary" to="/gantt">
                            View Gantt (by labels)
                        </Button>

                        <Button
                            variant="default"
                            onClick={() => {
                                props.setData([]);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            ) : (
                <Form className="select-file">
                    <Form.File
                        label="Excel file input"
                        onChange={readFile}
                        custom
                    />
                </Form>
            )}
        </Container>
    );
};

export default Home;
