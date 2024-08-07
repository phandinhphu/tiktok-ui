import { useState, forwardRef } from 'react';
import styles from './Images.module.scss';
import images from '~/assets/images';
import classNames from 'classnames';

const Images = forwardRef(({ className, src, alt, fallBack = images.default, ...props }, ref) => {
    const [_fallBack, setFallback] = useState('');

    const handleError = () => {
        setFallback(fallBack);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={_fallBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Images;
