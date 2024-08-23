import PropTypes from 'prop-types';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { roundArrow } from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defauleFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defauleFn, ...restProps }) {
    const [history, setHistory] = useState([{ data: items }]);

    const curr = history[history.length - 1];

    const renderItem = () => {
        return curr.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleResetToFistMenu = () => {
        setHistory([{ data: items }]);
    };

    return (
        <Tippy
            {...restProps}
            interactive
            arrow={roundArrow}
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div {...attrs} className={cx('menu-items')} tabIndex="-1">
                    <PopperWrapper className={cx('menu-popper')}>
                        {curr.title && (
                            <Header
                                title={curr.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, -1));
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{renderItem()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={handleResetToFistMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
