import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { PlannerRow } from '../../typings/PlannerRow';
import GanttChart from './GanttChart';

interface ICollapseCardProps {
    eventKey: string;
    title: string;
    plans: PlannerRow[];
}

const CollapseCard: React.FC<ICollapseCardProps> = ({
    eventKey,
    title = 'Grade 1',
    plans = [],
}) => {
    const rows = plans.map<any>((p) => {
        const start = p['Start Date'];
        const end = p['Due Date'];

        console.log('test date', p['Start Date']);
        return [
            p['Task ID'] || '',
            p['Task Name'] || '',
            p.Labels,
            new Date(start),
            new Date(end),
            null,
            88,
            null,
        ];
    });

    return (
        <Card>
            {/* <Accordion.Toggle as={Card.Header} eventKey={eventKey}> */}
            <Card.Title>{title}</Card.Title>
            {/* </Accordion.Toggle>
            <Accordion.Collapse eventKey={eventKey}> */}
            <Card.Body>
                <GanttChart rows={rows} />
            </Card.Body>
            {/* </Accordion.Collapse> */}
        </Card>
    );
};
export default CollapseCard;
