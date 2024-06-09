import styles from './index.module.css'
import { CustomInput } from '../input/primary';
import { PrimaryButton } from '../button/primary';

interface Props {
    onBack: any;
    onClose: any;
}

export function RenderChat(props: Props) {

    function onInputMessage(val: any) {
        console.log("valinput:", val)
    }
    
    function renderHeaderChat() {
        return (
            <div className={styles.headerContent}>
                <div className={"row"}>
                    <div className={styles.backIcon} onClick={() => props.onBack()}>
                        <img src={"icons/backIcon.svg"}  />
                    </div>
                    <div className={styles.headerInfo}>
                        <span className={styles.head}>
                            I - 589 - AMARKHIL, Obaidullah [Affirmative Filling with ZHN]
                        </span>
                        <span className={styles.info}>
                            3 Paritcipants
                        </span>
                    </div>
                </div>
                <div className={styles.closeIcon} onClick={() => props.onClose()}>
                    <img src={"icons/closeIcon.svg"} />
                </div>
            </div>
        )
    }
    
    function renderBodyChat() {
        return (
            <div>

            </div>
        )
    }

    function renderBottomChat() {
        return (
            <div className={styles.bottomContainer}>
                <div className={styles.innerContainer}>
                    <CustomInput 
                        placeHolder={"Type a new Message"}
                        onChange={(val: any) => console.log("val input: ", val)} />
                    <PrimaryButton onClick={() => console.log('click')}>
                        Send
                    </PrimaryButton>
                </div>

            </div>
        )
    }
    
    return (
        <div className={"column"}>
            {renderHeaderChat()}
            {renderBodyChat()}
            {renderBottomChat()}
        </div>
    )
}