import React from "react";

interface Props {
    website: string;
}

const DetailsView = ({website}: Props): React.JSX.Element => {
    return <div>{website}</div>;
};

export default DetailsView;
