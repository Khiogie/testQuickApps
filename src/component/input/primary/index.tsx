import styles from './index.module.css';

interface Props {
    onChange: any;
    placeHolder: any;
}

export function CustomInput(props: Props) {
    return (
        <div className={styles.containerInput}>
            <input 
                onChange={(event: any) => props.onChange(event.target.value)} 
                placeholder={props.placeHolder}
            />
        </div>
    )
}