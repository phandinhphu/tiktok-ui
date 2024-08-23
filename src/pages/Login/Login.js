import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import FormLogin from "~/components/FormLogin";

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <FormLogin />
        </div>
    );
}

export default Login;
