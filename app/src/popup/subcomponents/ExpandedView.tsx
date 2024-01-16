import React, {useState} from "react";
import {Sort} from "../Utils";
import DetailsView from "./DetailsView";
import DurationHeader from "./DurationHeader";
import TimeSpentList from "./TimeSpentList";

interface Props {
    sorted: Sort;
    setDetailsScreenWebsite: (website: string) => void;
}

export const ExpandedView = ({sorted, setDetailsScreenWebsite}: Props) => {

    return (

                        <div className="expanded-view-list-container">
                        <TimeSpentList sorted={sorted} onEnterClick={(domain) => setDetailsScreenWebsite(domain)} />
                    </div>
    );
};

export default ExpandedView;
