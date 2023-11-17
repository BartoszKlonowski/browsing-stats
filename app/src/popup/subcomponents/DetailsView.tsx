import React, {useMemo, useState} from "react";
import Database from "../../engine/Database";
import {translate} from "../../engine/i18n";

interface Props {
    website: string;
    onBackButtonClick: () => void;
}

const DetailsView = ({website, onBackButtonClick}: Props): React.JSX.Element => {
    const [lastVisited, setLastVisited] = useState<string>("...");
    const db = new Database();

    useMemo(() => {
        db.readLastVisited(website, (date) => {
            setLastVisited(date.toLocaleString());
        });
    }, []);

    return (
        <div className="details-view-container">
            <div className="details-view-website-title">{website}</div>
            <div className="details-view-details-table">
                <div className="details-view-last-visited-label">{translate("details-view-last-visited-label")}</div>
                <div className="details-view-last-visited-value">{lastVisited}</div>
            </div>
            <div className="details-view-back-button" onClick={onBackButtonClick}>
                {translate("details-view-back-button-label")}
            </div>
        </div>
    );
};

export default DetailsView;
