import * as React from 'react';
import {cn} from 'utils/classname';

import {Watch, WatchItem} from '../Watch/Watch';

import {zones} from './data';

import './Watches.scss';

const block = cn('watches');

export function Watches() {
    const [watchName, setWatchName] = React.useState('');
    const [zone, setZone] = React.useState(zones[0]);
    const [watches, setWatches] = React.useState<WatchItem[]>([]);

    const lastId = React.useRef(0);

    const handleAddWatch = () => {
        if (!zone || !watchName) {
            return;
        }

        const newWatch = {
            ...zone,
            name: watchName,
            watchId: lastId.current++,
        };
        setWatches((prev) => [...prev, newWatch]);
        setWatchName('');
        setZone(zones[0]);
    };

    const handleDelete = (watchId: number) => {
        setWatches((prev) => prev.filter((item) => item.watchId !== watchId));
    };

    return (
        <div className={block()}>
            <div className={block('create-block')}>
                <div className={block('create-field')}>
                    <label htmlFor="watchName">Название</label>
                    <input
                        className={block('create-control')}
                        id="watchName"
                        type="text"
                        value={watchName}
                        onChange={(e) => setWatchName(e.target.value)}
                    />
                </div>
                <div className={block('create-field')}>
                    <label htmlFor="zone">Временная зона</label>
                    <select
                        className={block('create-control')}
                        id="zone"
                        value={zone?.value}
                        onChange={(e) => setZone(zones.find((z) => z.value === e.target.value))}
                    >
                        {zones.map((z) => (
                            <option key={z.id} value={z.value}>
                                {z.display}
                            </option>
                        ))}
                    </select>
                </div>
                <button className={block('create-btn')} type="button" onClick={handleAddWatch}>
                    Добавить
                </button>
            </div>
            <div className={block('content')}>
                {watches.map((w, idx) => {
                    return <Watch key={idx} data={w} onDelete={handleDelete} />;
                })}
            </div>
        </div>
    );
}
