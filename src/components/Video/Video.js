import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faPlusCircle, faShare } from '@fortawesome/free-solid-svg-icons';

import styles from './Video.module.scss';
import Images from '~/components/Images/Images';
import { Wrapper as PoppperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import Share from '~/components/Popper/Share';
import {
    RepostIcon,
    EmbedIcon,
    SendIcon,
    ShareIcon,
    CopyLinkIcon,
    WhatsAppIcon,
    TwitterIcon,
    LinkedInIcon,
    RedditIcon,
    TelegramIcon,
    EmailIcon,
    LineIcon,
    PinterestIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

const ShareItem = [
    {
        icon: <RepostIcon />,
        text: 'Repost',
        to: '/repost',
    },
    {
        icon: <EmbedIcon />,
        text: 'Embed',
        to: '/embed',
    },
    {
        icon: <SendIcon />,
        text: 'Send to friends',
        to: '/friends',
    },
    {
        icon: <ShareIcon />,
        text: 'Share to Facebook',
        to: '/facebook',
    },
    {
        icon: <CopyLinkIcon />,
        text: 'Copy link',
        to: '/cobylink',
    },
    {
        icon: <WhatsAppIcon />,
        text: 'Share to WhatsApp',
        to: '/share/whatsapp',
    },
    {
        icon: <TwitterIcon />,
        text: 'Share to Twitter',
        to: '/share/twitter',
    },
    {
        icon: <LinkedInIcon />,
        text: 'Share to LinkedIn',
        to: '/share/linkedin',
    },
    {
        icon: <RedditIcon />,
        text: 'Share to Reddit',
        to: '/share/reddit',
    },
    {
        icon: <TelegramIcon />,
        text: 'Share to Telegram',
        to: '/share/telegram',
    },
    {
        icon: <EmailIcon />,
        text: 'Share to Email',
        to: '/share/email',
    },
    {
        icon: <LineIcon />,
        text: 'Share to Line',
        to: '/share/line',
    },
    {
        icon: <PinterestIcon />,
        text: 'Share to Pinterest',
        to: '/share/pinterest',
    },
];

function Video({ data = {} }) {
    const renderPreview = (attrs) => (
        <div {...attrs} className={cx('tooltip')} tabIndex="-1">
            <PoppperWrapper>
                <AccountPreview data={data.user} desc={data.description} />
            </PoppperWrapper>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <video className={cx('video')} controls>
                <source src={data.file_url} type="video/mp4" />
            </video>

            <div className={cx('action')}>
                <div className={cx('action-avatar')}>
                    <Tippy
                        interactive
                        delay={[500, 800]}
                        placement="bottom-start"
                        offset={[250, 10]}
                        render={renderPreview}
                    >
                        <Link to={`/@${data.user.nickname}`}>
                            <Images className={cx('avatar')} src={data.user.avatar} alt={data.name} />
                        </Link>
                    </Tippy>
                    <FontAwesomeIcon className={cx('flow-icon')} icon={faPlusCircle} />
                </div>

                <div className={cx('action-like')}>
                    <div className={cx('action-icon')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <strong>{data.likes_count}</strong>
                </div>

                <div className={cx('action-comment')}>
                    <div className={cx('action-icon')}>
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    <strong>{data.comments_count}</strong>
                </div>

                <div className={cx('action-share')}>
                    <Share items={ShareItem}>
                        <div className={cx('action-icon')}>
                            <FontAwesomeIcon icon={faShare} />
                        </div>
                    </Share>
                    <strong>{data.shares_count}</strong>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object,
};

export default Video;
