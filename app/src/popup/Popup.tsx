import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ExpandedView from "./subcomponents/ExpandedView";
import ShrinkedView from "./subcomponents/ShrinkedView";
import Button from "./subcomponents/Button";
import {Sort} from "./Utils";

export const Popup = (): JSX.Element => {
    const [expanded, setExpanded] = useState(false);
    const [order, setSortingOrder] = useState(Sort.None);
    const [isDetailsScreen, setDetailsScreen] = useState(false);

    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    return (
        <div className="popup-view">
            {expanded ? (
                <ExpandedView setSortingOrder={setSortingOrder} sorted={order} setDetailsScreen={setDetailsScreen} />
            ) : (
                <ShrinkedView setDetailsScreen={setDetailsScreen} />
            )}
            {!isDetailsScreen ? (
                <Button
                    label={expanded ? "shrink-button-label" : "expand-button-label"}
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                />
            ) : null}
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
