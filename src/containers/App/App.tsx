import {Watches} from 'components/Watches/Watches';
import {cn} from 'utils/classname';

import '../../styles/root.scss';
import './App.scss';

const block = cn('app');

export function App() {
    return (
        <div className={block()}>
            <Watches />
        </div>
    );
}
