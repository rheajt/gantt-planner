import Chart from 'react-google-charts';
import { PlannerRow } from '../../typings/PlannerRow';
import '../styles/gantt.css';

interface Props {
    label: string;
    plans: PlannerRow[];
    setDetails: Function;
}

function parseRatio(str: string) {
    if (!str.includes('/')) return 0;

    const [num, den] = str.split('/').map((n) => +n);
    return 100 * Math.round(num / den);
}

function GanttChart({ label, plans, setDetails }: Props) {
    const parentRow = [
        label,
        label.padStart(60, '-'),
        null,
        new Date(2020, 6, 1),
        new Date(2021, 6, 1),
        null,
        100,
        null
    ];

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


    const height = rows.length * 30 + 100;

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
                parentRow,
                ...rows,
            ]}
            options={{
                height,
                gantt: {
                    labelMinWidth: 300,
                    labelMaxWidth: 300,
                    criticalPathEnabled: false,
                    trackHeight: 30,
                    sortTasks: true,
                },
            }}
            rootProps={{ 'data-testid': label }}
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
                            setDetails(plan);
                        }
                    },
                },
            ]}
        />
    );
}

export default GanttChart;
