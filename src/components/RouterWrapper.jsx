import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom';

export default function RouterWrapper({ children, location }) {
    if (typeof window !== 'undefined') {
        return <BrowserRouter>{children}</BrowserRouter>;
    }
    return <StaticRouter location={location}>{children}</StaticRouter>;
}
