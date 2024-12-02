import React from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
    const { userSearchResults, recommendations, onAdd  } = props;
    const tracksToDisplay = userSearchResults ? userSearchResults : recommendations;
    
    return (
        <div className={styles.SearchResults}>
            <Tracklist 
                userSearchResults={tracksToDisplay} 
                isRemoval={false} 
                onAdd={onAdd} 
            />
        </div>
    )
}

export default SearchResults;