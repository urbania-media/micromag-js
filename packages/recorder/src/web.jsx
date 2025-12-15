import React from 'react';
import { createRoot } from 'react-dom/client';

import Viewer from '@micromag/viewer';
import '@micromag/viewer/assets/css/styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<Viewer />);
