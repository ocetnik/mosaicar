import * as React from "react";

interface IPaginationProps {
    onPrevPageClick: () => void;
    onNextPageClick: () => void;
    pageNumber: number;
}

class Pagination extends React.Component<IPaginationProps, {}> {
    public render() {
        const onPrevPageClick = () => this.props.onPrevPageClick();
        const onNextPageClick = () => this.props.onNextPageClick();

        return (
            <div>
                <button
                    onClick={onPrevPageClick}
                    disabled={this.props.pageNumber === 1}>
                    Previous page
                </button>
                <span> Page: {this.props.pageNumber} </span>
                <button
                    onClick={onNextPageClick}>
                    Next page
                </button>
            </div>
        );
    }
}

export default Pagination;
