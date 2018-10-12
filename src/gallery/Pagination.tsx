import * as React from "react";

interface IPaginationProps {
    onPrevPageClick: () => void;
    onNextPageClick: () => void;
    pageNumber: number;
}

class Pagination extends React.Component<IPaginationProps, {}> {
    public render() {
        return (
            <div>
                <button
                    onClick={this.props.onPrevPageClick}
                    disabled={this.props.pageNumber === 1}>
                    Previous page
                </button>
                <span> Page: {this.props.pageNumber} </span>
                <button
                    onClick={this.props.onNextPageClick}>
                    Next page
                </button>
            </div>
        );
    }
}

export default Pagination;
