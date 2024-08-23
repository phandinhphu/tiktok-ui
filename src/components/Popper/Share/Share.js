import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import ShareItem from './ShareItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Share.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Share({ children, items = [] }) {
    const [shareItems, setShareItems] = useState(items.slice(0, 5));
    const [isSeeAll, setIsSeeAll] = useState(false);

    const handleSeeAll = () => {
        setShareItems(prev => [...prev, ...items.slice(5)]);
        setIsSeeAll(true);
    }

    const handleReset = () => {
        setShareItems(items.slice(0, 5));
        setIsSeeAll(false);
    }

    const render = (attrs) => (
        <div {...attrs} className={cx('menu-items')} tabIndex="-1">
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-body')}>
                    {shareItems.map((item, index) => (
                        <ShareItem key={index} data={item} />
                    ))}
                </div>
                <div className={cx('menu-footer')}>
                    {items.length > 5 && !isSeeAll && (
                        <Button className={cx('menu-item', { separate: true, center: true })} onClick={handleSeeAll}>
                            <FontAwesomeIcon icon={faArrowAltCircleDown} />
                        </Button>
                    )}
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        <div>
            <Tippy
                interactive
                delay={[0, 700]}
                offset={[12, 8]}
                placement="top-start"
                render={render}
                onHide={handleReset}
            >
                {children}
            </Tippy>
        </div>
    );
}

Share.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
};

export default Share;
