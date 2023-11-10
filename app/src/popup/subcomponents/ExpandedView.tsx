import React, {useState} from "react";
import {Sort} from "../Utils";
import DetailsView from "./DetailsView";
import DurationHeader from "./DurationHeader";
import TimeSpentList from "./TimeSpentList";

interface Props {
    sorted: Sort;
    setSortingOrder: (order: Sort) => void;
}

export const ExpandedView = ({sorted, setSortingOrder}: Props) => {
    const [detailsScreenWebsite, setDetailsScreenWebsite] = useState<string | null>();

    return (
        <>
            {!detailsScreenWebsite ? <DurationHeader onSortSelected={setSortingOrder} /> : null}
            {detailsScreenWebsite ? (
                <DetailsView website={detailsScreenWebsite} />
            ) : (
                <div className="expanded-view-list-container">
                    <TimeSpentList sorted={sorted} onEnterClick={(domain) => setDetailsScreenWebsite(domain)} />
                </div>
            )}
        </>
    );
};

export default ExpandedView;
