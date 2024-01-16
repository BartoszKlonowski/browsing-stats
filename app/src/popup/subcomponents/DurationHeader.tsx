import React from "react";
import {translate} from "../../engine/i18n";
import SortingList from "./SortingList";
import {Sort} from "../Utils";

interface Props {
    isDetailsScreen: boolean;
    onSortSelected?: (option: Sort) => void;
}

export const DurationHeader = ({isDetailsScreen, onSortSelected}: Props) => {
    if(isDetailsScreen) {
        return null;
    }
    return (
        <div className="duration-header">
            <div className="duration-header-text">{translate("duration-header")}</div>
            {onSortSelected ? <SortingList onSelect={onSortSelected} /> : null}
        </div>
    );
};

export default DurationHeader;
