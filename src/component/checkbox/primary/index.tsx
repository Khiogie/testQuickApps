import { useEffect, useState } from 'react';
import styles from './index.module.css';


interface Props {
    isChecked: boolean;
    onChange: any;
}

export function Customcheckbox(props: Props) {

    const [isChecked, setIsChecked] = useState(props.isChecked);

    useEffect(function() {
        
    }, [isChecked]);
 
    function handleCheck() {
        setIsChecked(!isChecked);
        props.onChange();
    }

    return (
        <div 
            onClick={() => handleCheck()}
            className={styles.containerCheckbox}
        >
            <img 
                src={!isChecked ? "icons/check_box_outline_blank.svg" : "icons/check_box.svg"}
            />
        </div>
    )
}