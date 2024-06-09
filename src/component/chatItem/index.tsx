import { useRef, useState } from "react";
import styles from "./index.module.css";
import { MySenderName } from "@/src/function/const";
import useOutsideClick from "@/src/function/outside-click";
import { COLOR } from "@/styles/color";

interface Props {
    data: any;
}

export function ChatItems(props: Props) {
    const [isMoreOptions, setIsMoreOptions] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: dropdownRef,
        handler: () => {
            console.log("click");
            setIsMoreOptions(false)
        },
    });

    function handleMoreOptions() {
        setIsMoreOptions(!isMoreOptions);
    };

    function handleEdit() {
        console.log('edit');
    };

    function handleDelete() {
        console.log("delete");
    }

    return (
        <div 
            key={props.data.senderId.toString()}
            className={styles.contentItemChat} 
            style={{alignItems: props.data.senderName === MySenderName ? 'flex-end': "flex-start"}}>
            <span className={`${props.data.senderName === MySenderName ? styles.senderNameMe : styles.senderName}`}>
                {props.data.senderName === MySenderName ? "You" : props.data.senderName}
            </span>
            <div className={styles.contentBubbleChat} 
                style={{flexDirection: props.data.senderName === MySenderName ? "row-reverse" : "row"}} >
                <span className={`${props.data.senderName === MySenderName ? styles.bubbleChatMe : styles.bubbleChat}`}>
                    {props.data.text}
                </span>
                <div style={{zIndex: 2}} ref={dropdownRef}>
                    <img 
                        src={"icons/more.svg"} 
                        onClick={() => handleMoreOptions()}
                    />
                    {isMoreOptions ? <div className={styles.menuItem} >
                        <span 
                            onClick={() => handleEdit()}
                            style={{color: COLOR.primaryBlueColor}} >
                            Edit
                        </span>
                        <div style={{borderBottom: "1px solid #E0E0E0"}}/>
                        <span 
                            onClick={() => handleDelete()}
                            style={{color: COLOR.redColorIndicator}}>
                            Delete
                        </span>
                    </div> : null}
                </div>
            </div>
            
        </div>
    )
}