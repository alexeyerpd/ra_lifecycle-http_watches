export const zones = [
    {display: 'New York', value: 'America/New_York', id: '1', delta: '1'},
    {display: 'Moskow', value: 'Europe/Moscow', id: '2', delta: '2'},
    {display: 'London', value: 'Europe/London', id: '3', delta: '3'},
];

export type Zone = (typeof zones)[number];
