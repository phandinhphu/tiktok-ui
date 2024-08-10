import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Images from '~/components/Images';

const cx = classNames.bind(styles);

function AccountItem({ account }) {
    return (
        <Link to={`/@${account.nickname}`} className={cx('wrapper')}>
            <Images className={cx('avatar')} src={account?.avatar} alt={account.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{account.full_name}</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>{account.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    account: PropTypes.object.isRequired,
};

export default AccountItem;
