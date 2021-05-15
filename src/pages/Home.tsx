import React, { ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PlannerRow } from '../../typings/PlannerRow';
import { Link } from 'react-router-dom';
import xlsx from 'xlsx';

import '../styles/home.css';

interface Props {
    data: PlannerRow[];
    setData: Function;
}

const Home = (props: Props) => {
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

    console.log(props.data);
    return (
        <div className="wrapper">
            <Form className="select-file">
                <Form.File
                    label="Excel file input"
                    onChange={readFile}
                    custom
                />
            </Form>

            {props.data.length > 0 && (
                <>
                    <Button as={Link} variant="primary" to="/gantt">
                        View Gantt
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => {
                            props.setData([]);
                        }}
                    >
                        Cancel
                    </Button>
                </>
            )}
        </div>
    );
};

export default Home;
