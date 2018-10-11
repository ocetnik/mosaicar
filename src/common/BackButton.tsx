import * as React from "react";

interface IBackButtonProps {
    onBackButtonClick: () => void;
}

class BackButton extends React.Component<IBackButtonProps, {}> {
    public render() {
        const onBackButtonClick = () => this.props.onBackButtonClick();

        return (
            <div>
                <button onClick={onBackButtonClick}>Back</button>
            </div>
        );
    }
}

export default BackButton;
