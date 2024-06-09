import { useRef, useEffect } from 'react';
import styles from './index.module.css';

interface Props {
    isOpen: boolean;
    onClose: any;
    children: any;
}

export function ModalQuickTabs(props: Props) {
    
    const wrapperRef = useRef(null);

    useEffect(() => {
    
        function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div style={{transition: 'all .3s ease'}}>
            {props.isOpen ?
                <div className={styles.darkBG}>
                    <div 
                        className={styles.modalQuickTabsPosition} 
                        ref={wrapperRef}
                    >
                        <div 
                            className={styles.modalContainer}
                            
                        >
                            {props.children}
                        </div>
                    </div>
                </div> : null
            }
        </div>
    );
};