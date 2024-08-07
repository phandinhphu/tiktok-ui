import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputEle = useRef();

    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchInput)}&type=less`)
            .then((res) => res.json())
            .then((data) => {
                setSearchResult(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [searchInput]);

    const handleClear = () => {
        setSearchInput('');
        setSearchResult([]);
        inputEle.current.focus();
    };

    const handleHideResult = () => {
        setShowSearchResult(false);
    };

    return (
        <HeadlessTippy
            interactive
            visible={showSearchResult && searchResult.length > 0}
            render={(attrs) => (
                <div {...attrs} className={cx('search-result')} tabIndex="-1">
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((account) => (
                            <AccountItem key={account.id} account={account} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    value={searchInput}
                    ref={inputEle}
                    type="text"
                    placeholder="Search account and video"
                    spellCheck={false}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setShowSearchResult(true)}
                />

                {!!searchInput && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
