import React from 'react';
import { Card } from 'react-bootstrap';
import { PlannerRow } from '../../typings/PlannerRow';
import GanttChart from './GanttChart';

interface ICollapseCardProps {
    eventKey: string;
    title: string;
    plans: PlannerRow[];
}

function parseRatio(str: string) {
    if (!str.includes('/')) return 0;

    const [num, den] = str.split('/').map((n) => +n);
    return 100 * Math.round(num / den);
}

const CollapseCard: React.FC<ICollapseCardProps> = ({
    title = 'Grade 1',
    plans = [],
}) => {
    const rows = plans.map<any>((p) => {
        const start = p['Start Date'];
        const end = p['Due Date'];

        const percentage =
            p.Progress === 'Completed'
                ? 100
                : parseRatio(p['Completed Checklist Items']);

        return [
            p['Task ID'] || '',
            p['Task Name'] || '',
            p['Bucket Name'],
            new Date(start),
            new Date(end),
            null,
            percentage,
            null,
        ];
    });

    return (
        <Card>
            <Card.Title>{title}</Card.Title>
            <Card.Body>
                <GanttChart rows={rows} />
            </Card.Body>
        </Card>
    );
};
export default CollapseCard;
