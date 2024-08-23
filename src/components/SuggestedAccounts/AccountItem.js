import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PoppperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import Images from '~/components/Images';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (attrs) => (
        <div {...attrs} className={cx('tooltip')} tabIndex="-1">
            <PoppperWrapper>
                <AccountPreview data={data} />
            </PoppperWrapper>
        </div>
    );

    return (
        <div>
            <Tippy interactive delay={[500, 0]} placement="bottom-start" offset={[-20, 0]} render={renderPreview}>
                <div className={cx('account-item')}>
                    <Images className={cx('avatar')} src={data.avatar} alt={data.nickname} />

                    <div className={cx('info')}>
                        <p className={cx('name')}>
                            <strong>
                                {data.first_name} {data.last_name}
                            </strong>
                            {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('username')}>{data.nickname}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
