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

    const labels = props.data.reduce<string[]>((acc, cur) => {
        const ls = cur.Labels.split(';');

        ls.forEach((l) => {
            if (!acc.includes(l)) {
                acc.push(l);
            }
        });

        return acc;
    }, []);

    return (
        <div className="wrapper">
            {props.data.length > 0 ? (
                <>
                    <div>{labels}</div>

                    <div className="actions">
                        <Button as={Link} variant="primary" to="/gantt">
                            View Gantt
                        </Button>

                        <Button
                            as={Link}
                            variant="primary"
                            to="/labelled-gantt"
                        >
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
        </div>
    );
};

export default Home;
