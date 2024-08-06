import Home from '~/pages/Home';
import Following from '~/pages/Following';
import { DefaultLayout } from '~/components/Layout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout
    },
    {
        path: '/following',
        component: Following,
        layout: null
    },
    // Add more routes here...
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
