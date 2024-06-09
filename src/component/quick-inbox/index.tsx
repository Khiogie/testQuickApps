import { dataInboxList } from '@/public/dummy/data';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { RenderChat } from '../chat';
import { FontSize } from '@/styles/font';
import { Loading } from '../loading';

interface Props {
    onClose: any;
}

const delay = 2;

export function QuickInbox(props: Props) {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isRenderChat, setIsRenderChat] = useState(false);

    useEffect(function() {
        let time1 = setTimeout(() => {
            setIsLoadingData(false)
        }, delay * 1000 );
        return  () => {
            clearTimeout(time1);
        }
    } ,[])

    function handleInput(val: any) {
        console.log(val.target.value);
    };
    
    function handleClickMessage(val: any) {
        console.log("val: ", val);
        setIsRenderChat(true);
    }

    function renderListMessage() {
        return (
            <div className={styles.containerListMessage}>
                <div className={styles.containerSearchInput}>
                    <input style={{width: "100%"}} onChange={handleInput} placeholder='Search' />
                    <img src={"/icons/searchBlackIcon.svg"} />
                </div>
                {isLoadingData ? 
                    <div className={"center"} style={{flexDirection: "column"}}>
                        <Loading/>
                        <span style={{marginTop: "15px", fontSize: FontSize.Large}} >
                            Loading Chats ...
                        </span>
                    </div> : 
                    <div className={styles.listContainer}>
                        {dataInboxList.map((val: any) => {
                            return(
                                <div 
                                    className={styles.inboxListItem}
                                    onClick={() => handleClickMessage(val)}
                                >
                                    <img src={"icons/avatarInboxIcon.svg"} />
                                    <div className={"column"} style={{margin: "0 10px"}} >
                                        <div >
                                            <span className={styles.headerTags}>
                                                {val.tagsname}
                                            </span>
                                            <span className={styles.date}>
                                                {val.date}
                                            </span>
                                        </div>
                                        <span className={styles.name} >
                                            {val.name} :
                                        </span>
                                        <span className={styles.message}>
                                            {val.message}
                                        </span>
                                    </div>
                                    {val.new ? <div className={styles.dotRed}/> : null}
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }

    return (
        <div className={styles.containerInbox}>
            {!isRenderChat ? 
                <>
                    {renderListMessage()}
                </> : <RenderChat 
                        onBack={() => setIsRenderChat(false)}
                        onClose={() => props.onClose()}
                        />
            }
        </div>
    );
};