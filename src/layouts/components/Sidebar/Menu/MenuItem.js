import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, active }) {
    return (
        <NavLink
            to={to}
            className={(nav) => cx('menu-item', { active: nav.isActive })}
            activeclassname={cx('active')}
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{active}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    )
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    active: PropTypes.node.isRequired,
};

export default MenuItem;
