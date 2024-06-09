import styles from './index.module.css';

interface Props {
    children: any;
    onClick: any;
}

export function PrimaryButton(props: Props) {

    
    return(
        <button className={styles.containerButton} onClick={props.onClick}>
            {props.children}
        </button>
    )
}