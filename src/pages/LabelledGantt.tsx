import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { ILabelInfo } from '../../typings/ILabelInfo';
import { PlannerRow } from '../../typings/PlannerRow';
import GanttChart from '../components/GanttChart';
import Details from '../components/Details';
import '../styles/gantt.css';

interface Props {
    data: PlannerRow[];
    labels: ILabelInfo | null;
}

const Gantt = (props: Props) => {
    const [values, setValues] = useState<string[]>([]);
    const [details, setDetails] = useState<PlannerRow | null>(null);

    useEffect(() => {
        if (props.labels) {
            setValues(Object.keys(props.labels));
        }
    }, [props.labels]);

    if (!props.data.length || !props.labels) {
        return <Redirect to="/" />;
    }

    const plans = props.data
        //remove plans not started
        .filter((d) => d.Progress !== 'Not Started')
        //remove plans without a start date or due date
        .filter((d) => {
            return d['Start Date'] !== '' && d['Due Date'] !== '';
        })
        //remove plans before last august
        .filter((d) => {
            return new Date(d['Start Date']) > new Date(2020, 6, 1);
        })
        //remove plans without the selected labels
        .filter((d) => {
            if (!d.Labels) return false;

            return d.Labels.split(';').some((l) => values.includes(l));
        })
        .map((d) => {
            const splitLabels = d.Labels.split(';');
            const [mainLabel] = splitLabels.filter((each) =>
                values.includes(each)
            );
            return { ...d, Labels: mainLabel };
        });

    return (
        <Container fluid>
            <Row>
                <Col>
                    <pre>{JSON.stringify(props.labels, null, 2)}</pre>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <GanttChart setDetails={setDetails} plans={plans} />
                </Col>
                <Col sm={4}>{details && <Details details={details} />}</Col>
            </Row>
        </Container>
    );
};

export default React.memo(Gantt);
