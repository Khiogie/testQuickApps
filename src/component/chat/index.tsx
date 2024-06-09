import styles from './index.module.css'
import { CustomInput } from '../input/primary';
import { PrimaryButton } from '../button/primary';
import { dummyChat } from '@/public/dummy/data';
import { COLOR } from '@/styles/color';
import { FontSize } from '@/styles/font';

interface Props {
    onBack: any;
    onClose: any;
}

const mySenderName = "Claren";

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
            <div className={styles.contentChat}>
                {dummyChat.map(function(e: any) {
                    return (
                       <div className={styles.contentItemChat} style={{alignItems: e.senderName === mySenderName ? 'flex-end': "flex-start"}}>
                            <span className={`${e.senderName === mySenderName ? styles.senderNameMe : styles.senderName}`}>
                                {e.senderName}
                            </span>
                            <div className={styles.contentBubbleChat} style={{justifyContent: e.senderName === mySenderName ? "end" : "start"}} >
                                <span className={`${e.senderName === mySenderName ? styles.bubbleChatMe : styles.bubbleChat}`}>
                                    {e.text}
                                </span>
                            </div>
                        </div>
                    )
                })}
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