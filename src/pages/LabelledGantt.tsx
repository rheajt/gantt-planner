import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { PlannerRow } from '../../typings/PlannerRow';
import GanttChart from '../components/GanttChart';
import Details from '../components/Details';
import '../styles/gantt.css';

interface Props {
    data: PlannerRow[];
    labels: string[];
}

const Gantt: React.FC<Props> = (props) => {
    const [details, setDetails] = useState<PlannerRow | null>(null);

    if (!props.data.length || !props.labels) {
        return <Redirect to="/" />;
    }

    props.labels.sort();

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
        .map((d) => {
            const split = d.Labels.split(';');
            const labelMatch = split.filter((ls) => props.labels.includes(ls));

            return { ...d, Labels: labelMatch.join(';') };
        })
        .filter((d) => {
            return d.Labels;
        });
        //.sort((a, b) => a.Labels.localeCompare(b.Labels));

    return (
        <Container fluid>
            <Row>
                <Col sm={8}>
                    {props.labels.map(label => {
                        const hasLabel = plans.filter(p => p.Labels.includes(label)).length;

                        return <div key={`label-${label}`}>
                            {hasLabel ? (
                                <GanttChart label={label} setDetails={setDetails} plans={plans.filter(p => p.Labels.includes(label))} />
                            ) : (
                                <p>No plans found</p>
                            )}
                        </div>
                    })}
                </Col>

                <Col sm={4}>{details && <Details details={details} />}</Col>
            </Row>
        </Container>
    );
};

export default Gantt;
