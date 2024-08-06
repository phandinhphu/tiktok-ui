import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faSignIn,
    faEllipsisVertical,
    faGlobe,
    faCircleQuestion,
    faKeyboard,
    faCloudUpload,
    faMessage,
    faCoins,
    faGears,
    faUser,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MenuItems = [
    {
        icon: <FontAwesomeIcon icon={faGlobe} />,
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
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        text: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        text: 'Keyboard shortcuts',
    },
];

function Header() {
    const [seatchResult, setSearchResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

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
            icon: <FontAwesomeIcon icon={faUser} />,
            text: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            text: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGears} />,
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
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <HeadlessTippy
                    interactive
                    visible={seatchResult.length > 0}
                    render={(attrs) => (
                        <div {...attrs} className={cx('search-result')} tabIndex="-1">
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>

                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input type="text" placeholder="Search account and video" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>

                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Send Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
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
                            <img
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/d07db2a7b2c3d0a86c3b2642e3660f56~c5_300x300.webp?lk3s=a5d48078&nonce=96427&refresh_token=b5359f9c7328d9efb404544a0265eaaa&x-expires=1723035600&x-signature=zMt4qX0OvQbqa2yu1emJrET9wQM%3D&shp=a5d48078&shcp=c1333099"
                            />
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
