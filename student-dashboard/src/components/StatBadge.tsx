import "./StatBadge.css";
export default function StatBadge(props: {label: string; value: string; color?: string}){
    return (
        <div className="stat-badge" style={{borderColor: props.color || "var(--color-secondary)"}}>
        <span className="stat-label">{props.label}</span>
        <span className="stat-value" style={{color: props.color || "var(--color-primary)"}}>{props.value}</span>


        </div>

    );
}