import * as React from 'react';

interface IBackButtonProps {
    onBackButtonClick: () => void;
}

class BackButton extends React.Component<IBackButtonProps, {}> {
    public render() {
        return (
            <div>
                <button onClick={this.props.onBackButtonClick}>Back</button>
            </div>
        );
    }
}

export default BackButton;
