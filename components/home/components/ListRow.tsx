import rowStyles from "@/styles/home/row.module.css"
import {RowType} from "@/components/home/components/Row/RowType";
export const ListRow = () => {
    return <div className={rowStyles.row}>
        <RowType/>
        <div>content</div>
    </div>
}