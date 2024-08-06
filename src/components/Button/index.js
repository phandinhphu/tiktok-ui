import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    text = false,
    disabled = false,
    primary = false,
    rounded=false,
    outline = false,
    size = false,
    className,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        ...passProps,
        onClick,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        disabled,
        text,
        rounded,
        [className]: className,
        [size]: size,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon', 'left')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon', 'right')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
