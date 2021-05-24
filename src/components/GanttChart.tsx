import Chart from 'react-google-charts';
import { PlannerRow } from '../../typings/PlannerRow';
import '../styles/gantt.css';

interface Props {
    plans: PlannerRow[];
    setDetails: Function;
}

function parseRatio(str: string) {
    if (!str.includes('/')) return 0;

    const [num, den] = str.split('/').map((n) => +n);
    return 100 * Math.round(num / den);
}

function GanttChart({ plans, setDetails }: Props) {
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

    // rows.sort((a, b) => a[2] > b[2]);

    const height = rows.length * 30 + 50;

    return (
        <Chart
            width={'100%'}
            height={height + 'px'}
            chartType="Gantt"
            loader={<div>Loading Chart</div>}
            data={[
                [
                    { type: 'string', label: 'Task ID' },
                    { type: 'string', label: 'Task Name' },
                    { type: 'string', label: 'Resource' },
                    { type: 'date', label: 'Start Date' },
                    { type: 'date', label: 'End Date' },
                    { type: 'number', label: 'Duration' },
                    { type: 'number', label: 'Percent Complete' },
                    { type: 'string', label: 'Dependencies' },
                ],
                ...rows,
            ]}
            options={{
                height,
                gantt: {
                    trackHeight: 30,
                },
                animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true,
                },
            }}
            rootProps={{ 'data-testid': '2' }}
            chartEvents={[
                {
                    eventName: 'select',
                    callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();

                        if (selection.length === 1) {
                            const [selectedItem] = selection;
                            const dataTable = chartWrapper.getDataTable();
                            const { row } = selectedItem;

                            if (!dataTable) return;
                            const planId = dataTable.getValue(row, 0);
                            const [plan] = plans.filter(
                                (p) => p['Task ID'] === planId
                            );
                            console.log(plan);
                            setDetails(plan);
                        }
                    },
                },
            ]}
        />
    );
}

export default GanttChart;
