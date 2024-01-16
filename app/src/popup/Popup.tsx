import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ExpandedView from "./subcomponents/ExpandedView";
import ShrinkedView from "./subcomponents/ShrinkedView";
import Button from "./subcomponents/Button";
import {Sort} from "./Utils";
import DurationHeader from "./subcomponents/DurationHeader";
import DetailsView from "./subcomponents/DetailsView";

export const Popup = (): JSX.Element => {
    const [expanded, setExpanded] = useState(false);
    const [order, setSortingOrder] = useState(Sort.None);
    const [detailsScreenWebsite, setDetailsScreenWebsite] = useState<string | null>();

    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    return (
        <div className="popup-view">
            <DurationHeader isDetailsScreen={!!detailsScreenWebsite}  onSortSelected={expanded ? setSortingOrder : undefined} />
            <Button
                label={expanded ? "shrink-button-label" : "expand-button-label"}
                onClick={() => {
                    setExpanded(!expanded);
                }}
            />
            <DetailsView website={detailsScreenWebsite} onBackButtonClick={() => setDetailsScreenWebsite(null)} />
            {expanded ? <ExpandedView setDetailsScreenWebsite={setDetailsScreenWebsite} sorted={order} /> : <ShrinkedView />}
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
