import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar (props) {
    const [term, setTerm] = useState("");

    function passTerm() {
        props.onSearch(term)
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("search", term);
        window.history.pushState(null, "", `?${urlParams.toString()}`);
    }

    function handleTermChange({ target }) {
        setTerm(target.value);
    }

    return (
        <div className={styles.SearchBar}>
            <input
                placeholder="Enter A Song, Album, or Artist"
                onChange={handleTermChange}
                onKeyDown={event => event.key === "Enter" && passTerm()}
            />
            <button className={styles.SearchButton} onClick={passTerm}>
                SEARCH
            </button>
        </div>
    )
}

export default SearchBar;