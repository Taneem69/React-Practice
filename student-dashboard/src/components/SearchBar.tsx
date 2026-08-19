import "./SearchBar.css";

export default function SearchBar(props:{searchQuery: string; onSearchChange: (query: string)=>void}){
    return(
        <div className="search-bar">
          <input
            type="text" placeholder="Search by name or major..." value={props.searchQuery}
            onChange={(e) => props.onSearchChange(e.    target.value)}
            className="search-input"
          />
          {props.searchQuery && (
            <button className="search-clear" onClick={() => props.onSearchChange("")}>
              ✕
            </button>
          )}
        </div>
    );
}