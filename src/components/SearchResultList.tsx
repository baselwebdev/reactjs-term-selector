import React from 'react';

export interface P {
    status: boolean;
}

export interface S {
    searchString: string;
    value: boolean;
}

class SearchResultList extends React.Component<P, S> {
    constructor(props: Readonly<P>) {
        super(props);

        this.state = {
            searchString: '',
            value: props.status,
        };
    }

    render() {
        return (
            <div>
                <strong>{this.state.value}</strong>
            </div>
        );
    }
}

export default SearchResultList;
