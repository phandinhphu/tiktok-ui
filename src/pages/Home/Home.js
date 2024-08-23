import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';

import styles from './Home.module.scss';
import * as userServices from '~/services/userService';
import Video from '~/components/Video/Video';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await userServices.getVideos({ type: 'for-you', page: 1 });
                setVideos(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videos.map((video, index) => (
                <Video key={index} data={video} />
            ))}
        </div>
    );
}

export default memo(Home);
