import styles from "./Header.module.css";


const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Welcome to my Blog</h1>
            <h2>Armin Emami</h2>
        </header>
    );
};

export default Header;
