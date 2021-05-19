import { PlannerRow } from '../../typings/PlannerRow';

import '../styles/gantt.css';

interface Props {
    details: PlannerRow;
}

const Details: React.FC<Props> = ({ details }) => {
    return (
        <div className="details-container">
            <p>
                <b>Task:</b> {details['Task Name']}
            </p>

            <p>
                <b>Start:</b> {details['Start Date']} <b>End:</b>{' '}
                {details['Due Date']}
            </p>

            <p>
                <b>Assigned to:</b> {details['Assigned To']}
            </p>

            {details.Other &&
                Object.keys(details.Other).map((key) => {
                    return (
                        <p>
                            <b>{key}:</b> {details.Other[key]}
                        </p>
                    );
                })}

            <p>
                <b>Checklist:</b>
            </p>
            {details['Checklist Items'] && (
                <ol>
                    {details['Checklist Items'].split(';').map((ci) => (
                        <li key={ci}>{ci}</li>
                    ))}
                </ol>
            )}

            {process.env.NODE_ENV === 'development' && (
                <pre>{JSON.stringify(details, null, 2)}</pre>
            )}
        </div>
    );
};

export default Details;
