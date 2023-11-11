import React from "react";
import {translate} from "../../engine/i18n";

interface Props {
    website: string;
    onBackButtonClick: () => void;
}

const DetailsView = ({website, onBackButtonClick}: Props): React.JSX.Element => {
    return (
        <div className="details-view-container">
            <div className="details-view-website-title">{website}</div>
            <div className="details-view-back-button" onClick={onBackButtonClick}>
                {translate("details-view-back-button-label")}
            </div>
        </div>
    );
};

export default DetailsView;
