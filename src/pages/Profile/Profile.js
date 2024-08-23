import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import Header from './Header';
import Video from './Video';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Profile() {
    const tabs = ['Videos', 'Reposts', 'Liked'];
    const [activeTab, setActiveTab] = useState(0);
    const [linePosition, setLinePosition] = useState({
        transform: 'translateX(0)',
        width: 0,
    });
    const [user, setUser] = useState({});
    const tabRefs = useRef([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const user = await userService.getUser({ username });
                setUser(user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApi();
    }, [username]);

    useEffect(() => {
        const currTab = tabRefs.current[activeTab];
        if (currTab) {
            const { offsetWidth, offsetLeft } = currTab;
            setLinePosition({ transform: `translateX(${offsetLeft}px)`, width: offsetWidth });
        }
    }, [activeTab]);

    const handleMouseEnter = (index) => {
        const currentTab = tabRefs.current[index];
        if (currentTab) {
            const { offsetWidth, offsetLeft } = currentTab;
            setLinePosition({ transform: `translateX(${offsetLeft}px)`, width: offsetWidth });
        }
    };

    const handleMouseLeave = () => {
        const currentTab = tabRefs.current[activeTab];
        if (currentTab) {
            const { offsetWidth, offsetLeft } = currentTab;
            setLinePosition({ transform: `translateX(${offsetLeft}px)`, width: offsetWidth });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Header user={user} />

            <div className={cx('content')}>
                <div className={cx('tabs')}>
                    {tabs.map((tab, index) => (
                        <p
                            key={index}
                            ref={(el) => (tabRefs.current[index] = el)}
                            className={cx('tab', { active: index === activeTab })}
                            onClick={() => setActiveTab(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span>{tab}</span>
                        </p>
                    ))}

                    <div className={cx('line')} style={linePosition}></div>
                </div>
                <Video data={user.videos} />
            </div>
        </div>
    );
}

export default Profile;
