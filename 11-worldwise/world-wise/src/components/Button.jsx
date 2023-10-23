import styles from './Button.module.css';

function Button({ children, onClick, type }) {
  // styles[type] is a dynamic property
  // styles['primary'] === styles.primary, etc
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
