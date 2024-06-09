import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { QuickInbox } from '../quick-inbox';
import { FloatingGroup } from '@/public/dummy/data';
import { COLOR, COLORFILTER } from '@/styles/color';
import Image from 'next/image'
import { QuickTask } from '../quick-task';

export function FloatingGroupButton () {
    const [dataOriginalIconTabs, setDataOriginalIconTabs]: any = useState(null);
    const [dataIconTabs, setDataIconTabs]: any = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isActiveTask, setIsActiveTask] = useState(false);
    const [isActiveInbox, setIsActiveInbox] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [activeOpen, setActiveOpen]: any = useState(null);
    const [isHiddenTabs, setIsHiddenTabs] = useState(false);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
    
        function handleClickOutside(event: any) {
            //@ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsActive(false);
                setIsHiddenTabs(false);
                setIsOpenPopUp(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(function() {
        getFirstDataIconTabs();
    }, []);

    function getFirstDataIconTabs() {
        setDataOriginalIconTabs(FloatingGroup);
        setDataIconTabs(FloatingGroup);

    }

    function moveIcon(val: any) {
        dataOriginalIconTabs.forEach(function(item: any, index: number) {
            if(item.name == val.name) {
                dataOriginalIconTabs.splice(index, 1);
                dataOriginalIconTabs.unshift(item);
            }
        })
    }

    function handleClickFab(event: any) {
        setIsActive(!isActive);
        setIsHiddenTabs(false);
        setIsOpenPopUp(false);
        setActiveOpen(null);
    };

    function handleCloseAll() {
        setIsActive(false);
        setIsHiddenTabs(false);
        setIsOpenPopUp(false);
    }

    function handleClickTabs(event: any, index: any) {
        if(event.name == "task") {
            setIsActiveTask(!isActiveTask);
            setIsActiveInbox(!isActiveInbox);
        }
        if(event.name == "inbox") {
            setIsActiveInbox(!isActiveInbox);
            setIsActiveTask(!isActiveTask);

        }
        setActiveOpen(event.name);
        setIsHiddenTabs(true);
        // setIsOpenModal(true);
        moveIcon(event);
        setIsOpenPopUp(true);
    };

    function transformIndexList(index: any) {
        if(index == 0) {
            return "translateX(-80px)";
        };
        if(index == 1) {
            return "translateX(-160px)";
        };
        if(index == 2) {
            return "translateX(-240px)";
        };
        if(index == 3) {
            return "translateX(-320px)";
        };
    };

    function checkIconList(event: any, index: any) {
        if(event.name == "inbox") {
            return "icons/messagePurple.svg";
        };
        if(event.name == "task") {
            return "icons/taskOrange.svg"
        };
    };

    function renderContainerModal() {
        if(activeOpen == "inbox") {
            return <QuickInbox onClose={handleCloseAll} />
        }; 

        if(activeOpen == "task") {
            return <QuickTask />
        }
    };

    function changeColorBackgroundIndicator(event: any) {
        if(activeOpen == "inbox" && event.name == "inbox") {
            return COLOR.purpleColorIndicator;
        } else if(activeOpen == "task" && event.name == "task") {
            return COLOR.orangeColorIndicator;
        }

        else {
            return COLOR.whiteSmokeColorSticker
        };
    };

    return (
        <div
            ref={wrapperRef} 
            className='column'
            style={{
                    display: 'flex',
                    position: "fixed",
                    bottom: "30px",
                    right: "30px"
                }}
        >
            <div 
                className={styles.panel}
                style={{
                    opacity: !isOpenPopUp ? "0" : "1",
                    visibility: !isOpenPopUp ? "hidden" : "visible",
                    transform: !isOpenPopUp ? 'scale(0)' : 'scale(1)',
                    transition: "transform 0.2s, visibility 0s 0s, opacity 0.2s"
                }}
            >
                <div className={styles.body}>
                    {renderContainerModal()}
                </div>
            </div>
            <div className={styles.containerButtonFloat} >
                <div 
                    style={{
                        zIndex: isHiddenTabs ? "0" : '9999' ,
                        transition: "all .2s ease",
                        marginRight: isHiddenTabs ? '15px' : "0px"
                    }}
                >
                    <img 
                        src={"/icons/lightingIcon.svg"}
                        className={styles.buttonFloat}
                        style={{
                            backgroundColor: isHiddenTabs ? COLOR.primaryGreyColor1 : COLOR.primaryBlueColor,
                            padding: '20px',
                            width: !isHiddenTabs ? "68px" : "66px",
                            height: !isHiddenTabs ? "68px" : "66px"
                        }}
                        onClick={handleClickFab} 
                    />
                </div>
                <div className={styles.containerSubButton} style={{
                    marginRight: isHiddenTabs ? '-93px' : '66px' 
                }}>
                    {dataIconTabs != null ? <>
                        {dataIconTabs.map((event: any, index: any) => {
                        return (
                            <div 
                                
                                className={styles.subButton}
                                onClick={() => handleClickTabs(event, index)}
                                style={{color: isActive ? "white" : "transparent", 
                                    transform: isActive ? transformIndexList(index) : "translateX(0px)",
                                    zIndex: "9"
                                }}
                            >
                                <span >
                                    {event.name}
                                </span>
                                <div 
                                    className={styles.groupIconFloat}
                                    style={{
                                        backgroundColor: changeColorBackgroundIndicator(event),
                                    }}>
                                    <img 
                                        src={checkIconList(event, index)} 
                                        alt={"icon"}
                                        style={{
                                            width: "30.22px", 
                                            height: "30.22px",
                                            transition: 'all 0.2s ease',
                                            filter: activeOpen == event.name ? COLORFILTER.primaryWhiteSmokeColor : ""
                                        }} 
                                    />
                                </div>
                            </div>
                        )
                    })}
                    </> : null}
                </div>
            </div>
        </div>
    );
};