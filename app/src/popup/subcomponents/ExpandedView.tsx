import React, {useState} from "react";
import {Sort} from "../Utils";
import DetailsView from "./DetailsView";
import DurationHeader from "./DurationHeader";
import TimeSpentList from "./TimeSpentList";

interface Props {
    sorted: Sort;
    setSortingOrder: (order: Sort) => void;
    setDetailsScreen: (isDetails: boolean) => void;
}

export const ExpandedView = ({sorted, setSortingOrder, setDetailsScreen}: Props) => {
    const [detailsScreenWebsite, setDetailsScreenWebsite] = useState<string | null>();

    return (
        <>
            {!detailsScreenWebsite ? <DurationHeader onSortSelected={setSortingOrder} /> : null}
            {detailsScreenWebsite ? (
                <DetailsView
                    website={detailsScreenWebsite}
                    onBackButtonClick={() => {
                        setDetailsScreenWebsite(null);
                        setDetailsScreen(false);
                    }}
                />
            ) : (
                <div className="expanded-view-list-container">
                    <TimeSpentList
                        sorted={sorted}
                        onEnterClick={(domain) => {
                            setDetailsScreenWebsite(domain);
                            setDetailsScreen(true);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default ExpandedView;
