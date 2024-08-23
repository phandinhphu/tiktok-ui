import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview({ data, desc }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Images className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <div>
                    <Button primary size="s">
                        Follow
                    </Button>
                </div>
            </div>

            <div className={cx('info')}>
                <p className={cx('name')}>
                    <strong>
                        {data.first_name} {data.last_name}
                    </strong>
                    {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                </p>
                <p className={cx('username')}>{data.nickname}</p>

                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers_count}</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.likes_count}</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>

            {desc && <p className={cx('desc')}>{desc}</p>}
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
