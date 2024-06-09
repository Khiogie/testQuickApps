import { SearchInput } from '../input/search';
import styles from './index.module.css';

interface Props {
    children: any;
}

export function SidebarNavigation(props: Props) {
    return (
        <div className={"row"}>
            <div className={styles.sidebar}>
                {""}
            </div>
            <div className={styles.container}>
                <SearchInput/>
                {props.children}
            </div>
        </div>
    )
}