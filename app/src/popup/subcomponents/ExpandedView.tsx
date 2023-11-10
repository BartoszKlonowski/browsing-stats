import React, {useState} from "react";
import {Sort} from "../Utils";
import DetailsView from "./DetailsView";
import TimeSpentList from "./TimeSpentList";

interface Props {
    sorted: Sort;
}

export const ExpandedView = ({sorted}: Props) => {
    const [detailsScreenWebsite, setDetailsScreenWebsite] = useState<string | null>();

    return (
        <div className="expanded-view-list-container">
            {detailsScreenWebsite ? (
                <DetailsView website={detailsScreenWebsite} />
            ) : (
                <TimeSpentList sorted={sorted} onEnterClick={(domain) => setDetailsScreenWebsite(domain)} />
            )}
        </div>
    );
};

export default ExpandedView;
