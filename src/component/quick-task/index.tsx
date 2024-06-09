import { dataDropdown, dummyTaskList } from "@/public/dummy/data";
import Dropdown from "../select/border";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../button/primary";
import TaskItem from "../list-task-item";
import { Loading } from "../loading";
import { FontSize } from "@/styles/font";
import { COLOR } from "@/styles/color";

interface Props {
    
}

const delay = 2;

export function QuickTask(props: Props) {

    const [selectedMenu, setSelectedMenu] = useState([]); 
    const [dataTask, setDataTask] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);    

    useEffect(function() {
        let time1 = setTimeout(() => {
            setIsLoading(false)
        }, delay * 1000 );
        return  () => {
            clearTimeout(time1);
        }
    } ,[])

    function handleSelectedMenu(val: any) {
        console.log("val: ", val);
    }

    function handleNewTask() {

    }

    function renderHeader() {
        return (
            <div className={styles.headerContainer}>
                <div style={{}}>
                    <Dropdown
                        id='task'
                        title='Select Task'
                        data={dataDropdown}
                        selectedId='3'
                        onSelect={handleSelectedMenu}
                        />
                </div>
                <PrimaryButton onClick={() => console.log("click")} >
                    New Task
                </PrimaryButton>
            </div>
        )
    }

    function renderBodyTask() {
        return (
            <div style={{
                display: "block",
                position: 'relative',
                padding: "0 20px",
                overflowY: "auto",
                height: "100%"
            }}>
                {dummyTaskList.map(function(event: any){
                    return (
                        <div key={event.id}>
                            <TaskItem data={event}/>
                        </div>
                    )
                })}
            </div>
        )
    }
 
    return (
        <div className={styles.container}>
            {renderHeader()}
            {!isLoading ? 
                <>
                    {renderBodyTask()}
                </> : <div className={"center"} style={{flexDirection: "column"}}>
                        <Loading/>
                        <span style={{marginTop: "15px", fontSize: FontSize.Large, color: COLOR.primaryGreyColor1}} >
                            Loading Task List ...
                        </span>
                    </div>
            }
        </div>
    )
}