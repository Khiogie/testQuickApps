import { COLOR } from "@/styles/color";
import styles from "./index.module.css";

export function SearchInput() {
    
    function handleSearchInput(event: any) {
        console.log(event.target.value);
    }
    
    
    return (
        <div 
            className={styles.containerSearch}
            style={{
                backgroundColor: COLOR.primaryGreyColor1
            }}>
            <img src={"/icons/searchIcon.svg"} style={{height: "15px", width: "15px"}} />
            <input 
                onChange={handleSearchInput} 
                type="text"
                className={styles.input}
                
            />
        </div>
    )
}