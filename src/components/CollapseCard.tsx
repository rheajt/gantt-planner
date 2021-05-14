import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import GanttChart from './GanttChart';

interface ICollapseCardProps {
    eventKey: string;
    title: string;
}

const CollapseCard: React.FC<ICollapseCardProps> = ({
    eventKey,
    title = 'Grade 1',
}) => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
                {title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    <GanttChart />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};
export default CollapseCard;
