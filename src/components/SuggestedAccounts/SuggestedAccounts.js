import { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ data = [], label, isSeeAll = false, onViewChange = () => {} }) {


    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            <p>
                <span className={cx('see-all')} onClick={() => onViewChange(isSeeAll)}>
                    {isSeeAll ? 'See less' : 'See all'}
                </span>
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    isSeeAll: PropTypes.bool,
    onViewChange: PropTypes.func,
};

export default memo(SuggestedAccounts);
