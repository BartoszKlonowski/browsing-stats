import React from "react";
import {translate} from "../../engine/i18n";
import SortingList from "./SortingList";
import {Sort} from "../Utils";

interface Props {
    isExpanded: boolean;
    onSortSelected: (option: Sort) => void;
}

export const DurationHeader = ({isExpanded, onSortSelected}: Props) => {
    return (
        <div className="duration-header">
            <div className="duration-header-text">{translate("duration-header")}</div>
            {isExpanded ? <SortingList onSelect={onSortSelected} /> : null}
        </div>
    );
};

export default DurationHeader;
