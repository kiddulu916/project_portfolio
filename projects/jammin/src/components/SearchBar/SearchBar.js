import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar (props) {
    const [term, setTerm] = useState("");

    function passTerm() {
        props.onSearch(term)
    }

    function handleTermChange({ target }) {
        setTerm(target.value);
    }

    function handleSearch() {
        props.onSearch(term);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("search", term);
        window.history.pushState(null, "", `?${urlParams.toString()}`);
    }

    return (
        <div className={styles.SearchBar}>
            <input
                placeholder="Enter A Song, Album, or Artist"
                onChange={handleTermChange}
            />
            <button className={styles.SearchButton} onClick={passTerm}>
                SEARCH
            </button>
        </div>
    )
}

export default SearchBar;