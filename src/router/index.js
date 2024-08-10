// Configs
import config from '~/config';

// Laouts
import DefaultLayout from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.follwing,
        component: Following,
        layout: null,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: DefaultLayout,
    },
    // Add more routes here...
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
