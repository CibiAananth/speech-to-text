import * as ReactDOM from 'react-dom/client';
import './global.css';

import Recorder from './pages/Home/Page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<Recorder />);
