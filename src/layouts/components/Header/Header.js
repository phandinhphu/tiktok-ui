import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faEllipsisVertical, faKeyboard, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import {
    MessagesIcon,
    InboxIcon,
    UploadIcon,
    UserIcon,
    GetCoinsIcon,
    SettingIcon,
    LanguageIcon,
    FeedbackIcon,
} from '~/components/Icons';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Images from '~/components/Images';
import Search from '~/layouts/components/Search';
import config from '~/config';

const cx = classNames.bind(styles);

const MenuItems = [
    {
        icon: <LanguageIcon />,
        text: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    text: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    text: 'English',
                },
                {
                    type: 'language',
                    code: 'es',
                    text: 'Spanish',
                },
                {
                    type: 'language',
                    code: 'fr',
                    text: 'French',
                },
                {
                    type: 'language',
                    code: 'de',
                    text: 'German',
                },
                {
                    type: 'language',
                    code: 'it',
                    text: 'Italian',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        text: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        text: 'Keyboard shortcuts',
    },
];

function Header({ currentUser = null }) {

    // Handle logic
    const handleMenuChange = (item) => {
        switch (item.type) {
            case 'language':
                // Do some thing...
                break;
            default:
                break;
        }
    };

    const userMenu = [
        {
            icon: <UserIcon />,
            text: 'View profile',
            to: `/@${currentUser?.nickname}`,
        },
        {
            icon: <GetCoinsIcon />,
            text: 'Get coins',
            to: '/coins',
        },
        {
            icon: <SettingIcon />,
            text: 'Settings',
            to: '/settings',
        },
        ...MenuItems,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            text: 'Logout',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Send Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessagesIcon />
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <div className={cx('count')}>13</div>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />}>
                                Login
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MenuItems} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Images className={cx('user-avatar')} alt={currentUser.nickname} src={currentUser.avatar} />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
