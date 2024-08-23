// Configs
import config from '~/config';

// Laouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: HeaderOnly,
    },
    // Add more routes here...
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
