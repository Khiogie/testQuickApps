import styles from './index.module.css';

export function Loading() {
    return (
        <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    )
}