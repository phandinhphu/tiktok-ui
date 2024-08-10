import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { searchUsers } from '~/services/searchService';
import { useDebounce } from '~/hooks';
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

    let debouncedSearchInput = useDebounce(searchInput, 500);

    useEffect(() => {
        if (debouncedSearchInput.trim() === '') {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            try {
                setLoading(true);

                const result = await searchUsers({ q: debouncedSearchInput, type: 'less' });
                setSearchResult(result);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchApi();
    }, [debouncedSearchInput]);

    const handleClear = () => {
        setSearchInput('');
        setSearchResult([]);
        inputEle.current.focus();
    };

    const handleHideResult = () => {
        setShowSearchResult(false);
    };

    return (
        // Using a wrapper <div> tag around the reference element solves this
        // by creating a new parentNode context.
        <div>
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
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={(e) => {
                            if (e.target.value.startsWith(' ')) {
                                return;
                            }

                            setSearchInput(e.target.value);
                        }}
                        onFocus={() => setShowSearchResult(true)}
                    />

                    {!!searchInput && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
