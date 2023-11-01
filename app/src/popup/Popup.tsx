import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import DurationHeader from "./subcomponents/DurationHeader";
import ExpandedView from "./subcomponents/ExpandedView";
import ShrinkedView from "./subcomponents/ShrinkedView";
import ViewChangeButton from "./subcomponents/ViewChangeButton";
import {Sort} from "./Utils";

export const Popup = (): JSX.Element => {
    const [expanded, setExpanded] = useState(false);
    const [order, setSortingOrder] = useState(Sort.None);

    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    return (
        <div className="popup-view">
            <DurationHeader isExpanded={expanded} onSortSelected={setSortingOrder} />
            {expanded ? <ExpandedView sorted={order} /> : <ShrinkedView />}
            <ViewChangeButton isExpanded={expanded} onClick={setExpanded} />
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
