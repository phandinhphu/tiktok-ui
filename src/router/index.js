import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
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
    {
        path: '/:nickname',
        component: Profile,
        layout: DefaultLayout,
    }
    // Add more routes here...
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
