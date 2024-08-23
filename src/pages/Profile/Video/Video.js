import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ data = [] }) {
    return (
        <div className={cx('grid', 'wide')}>
            <h2 className={cx('title')}>Videos</h2>

            <div className={cx('videos')}>
                <div className={cx('row')}>
                    {data.map((video) => (
                        <div key={video.id} className={cx('video', 'col', 'l-3')}>
                            <video className={cx('video-player')} controls>
                                <source src={video.file_url} type="video/mp4" />
                            </video>

                            <div className={cx('video-bio')}>
                                <p className={cx('video-description')}>{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.array,
};

export default Video;
