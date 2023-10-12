import styles from "./Background.module.scss";

const Background = () => {
  return (
    <div className={styles.background} data-testid="background">
      <figure className={styles.background__shape1}></figure>
      <figure className={styles.background__shape2}></figure>
      <figure className={styles.background__shape3}></figure>
      <figure className={styles.background__shape4}></figure>
    </div>
  );
};

export default Background;
