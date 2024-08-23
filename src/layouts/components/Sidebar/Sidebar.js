import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeIconActive,
    UsersGroupIcon,
    UsersGroupIconActive,
    LiveIcon,
    LiveIconActive,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const INITIAL_PAGE = 1;
const PER_PAGE = 5;

function Sidebar({ currentUser }) {
    const [totalPage, setTotalPage] = useState(0);
    const [pageFollowing, setPageFollowing] = useState(INITIAL_PAGE);
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [followingAccounts, setFollowingAccounts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await userService.getSuggested({
                    page: INITIAL_PAGE,
                    per_page: PER_PAGE,
                });
                setSuggestedAccounts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await userService.getFollowing({
                    page: pageFollowing,
                });
                if (data.data) {
                    pageFollowing === 1
                        ? setFollowingAccounts(data.data)
                        : setFollowingAccounts((prev) => [...prev, ...data.data]);
                }
                setTotalPage(data.meta.pagination.total_pages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApi();
    }, [pageFollowing]);

    useEffect(() => {
        if (pageFollowing === totalPage) {
            setIsSeeAll(true);
        } else {
            setIsSeeAll(false);
        }
    }, [pageFollowing, totalPage]);

    const handleViewChange = useCallback(
        (isSeeAll) => {
            if (isSeeAll) {
                setPageFollowing(INITIAL_PAGE);
            } else {
                setPageFollowing(pageFollowing + 1);
            }
        },
        [pageFollowing],
    );

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Home" icon={<HomeIcon />} active={<HomeIconActive />} to={config.routes.home} />
                <MenuItem
                    title="Following"
                    icon={<UsersGroupIcon />}
                    active={<UsersGroupIconActive />}
                    to={config.routes.following}
                />
                <MenuItem title="Live" icon={<LiveIcon />} active={<LiveIconActive />} to={config.routes.profile} />
            </Menu>

            {currentUser ? (
                <>
                    <SuggestedAccounts data={suggestedAccounts} label="Suggested Accounts" />
                    <SuggestedAccounts
                        label="Following Accounts"
                        data={followingAccounts}
                        isSeeAll={isSeeAll}
                        onViewChange={handleViewChange}
                    />
                </>
            ) : (
                <div className={cx('login')}>
                    <p className={cx('login-label')}>Log in to follow creators, like videos, and view comments.</p>
                    <Button to={config.routes.login} outline>Login</Button>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
