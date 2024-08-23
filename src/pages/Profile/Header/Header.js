import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header({ user = {} }) {
    return (
        <div className={cx('wrapper')}>
            <Images className={cx('avatar')} alt={user.nickname} src={user.avatar} />

            <div className={cx('info')}>
                <div className={cx('name-group')}>
                    <h1 className={cx('name')}>
                        {user.first_name} {user.last_name}
                    </h1>
                    <h1 className={cx('bio')}>{user.bio}</h1>
                </div>

                <div className={cx('stats')}>
                    <div className={cx('stat')}>
                        <div className={cx('value')}>{user.videos?.length}</div>
                        <span className={cx('label')}>Posts</span>
                    </div>
                    <div className={cx('stat')}>
                        <div className={cx('value')}>{user.followers_count}</div>
                        <span className={cx('label')}>Followers</span>
                    </div>
                    <div className={cx('stat')}>
                        <div className={cx('value')}>{user.followings_count}</div>
                        <span className={cx('label')}>Following</span>
                    </div>
                </div>

                <div className={cx('actions')}>
                    <Button className={cx('action')} primary>
                        Follow
                    </Button>
                    <Button className={cx('action')} to="/" rounded>
                        Message
                    </Button>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    user: PropTypes.object,
};

export default Header;
