import * as React from 'react';
import {Zone} from 'components/Watches/data';
import * as dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {cn} from 'utils/classname';

import './Watch.scss';

dayjs.extend(utc);
dayjs.extend(timezone);

const block = cn('watch');

export type WatchItem = Zone & {name: string; watchId: number};

export interface WatchProps {
    data: WatchItem;
    onDelete: (id: number) => void;
}

export function Watch({data: {name, value, watchId}, onDelete}: WatchProps) {
    const [date, setDate] = React.useState({h: 0, m: 0, s: 0});
    React.useEffect(() => {
        let reqId: number;
        function action() {
            const d = dayjs().tz(value);
            setDate({h: d.hour() % 12, m: d.minute(), s: d.second()});
            reqId = requestAnimationFrame(action);
        }
        action();
        return () => cancelAnimationFrame(reqId);
    }, [value]);
    return (
        <div className={block()}>
            <button className={block('btn-delete')} onClick={() => onDelete(watchId)}>
                X
            </button>
            {name}
            <div className={block('circle')}>
                <div
                    className={block('arrow', {hour: true})}
                    style={{transform: `rotate(${valueToDeg(date.h, 12)}deg)`}}
                ></div>
                <div
                    className={block('arrow', {minuts: true})}
                    style={{transform: `rotate(${valueToDeg(date.m, 60)}deg)`}}
                ></div>
                <div
                    className={block('arrow', {seconds: true})}
                    style={{transform: `rotate(${valueToDeg(date.s, 60)}deg)`}}
                ></div>
                {Array.from({length: 12}).map((_, i) => {
                    const props = {
                        'ordinal-number': i + 1,
                    };
                    return (
                        <div
                            key={i}
                            className={block('serif')}
                            {...props}
                            style={{'--ordinal-number': i + 1} as React.CSSProperties}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}

function valueToDeg(value: number, max: number) {
    return (value / max) * 360;
}
