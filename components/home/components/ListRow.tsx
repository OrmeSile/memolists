import rowStyles from "@/styles/home/row.module.css"
export const ListRow = () => {
    return <div className={rowStyles.row}>
        <button><p>type</p></button>
        <div>content</div>
    </div>
}