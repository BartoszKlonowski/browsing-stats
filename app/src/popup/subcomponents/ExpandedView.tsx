import React from "react";
import {Sort} from "../Utils";
import TimeSpentList from "./TimeSpentList";

interface Props {
    sorted: Sort;
    setDetailsScreenWebsite: (website: string) => void;
}

export const ExpandedView = ({sorted, setDetailsScreenWebsite}: Props) => {
    return <TimeSpentList sorted={sorted} onEnterClick={(domain) => setDetailsScreenWebsite(domain)} />;
};

export default ExpandedView;
