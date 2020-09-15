import React from 'react';
import NoneButton from '../../../components/NoneButton';

interface P {
    onClick: (term: string) => void;
    foundParentTerms: string[];
    foundChildTerms: string[];
    foundRelatedTerms: string[];
}

interface S {}

class MetaTermList extends React.Component<P, S> {
    createMetaButtons(term: string, index: number): JSX.Element {
        return (
            <div
                key={index}
                className={'col-4 meta_term_item'}
                onClick={() => {
                    this.props.onClick(term);
                }}
            >
                {term}
            </div>
        );
    }

    createParentTermButtons(): JSX.Element | JSX.Element[] {
        if (this.props.foundParentTerms.length > 0) {
            return this.props.foundParentTerms.map(
                (term: string, index: number) => {
                    return this.createMetaButtons(term, index);
                },
            );
        }
        return <NoneButton />;
    }

    createChildTermButtons(): JSX.Element | JSX.Element[] {
        if (this.props.foundChildTerms.length > 0) {
            return this.props.foundChildTerms.map(
                (term: string, index: number) => {
                    return this.createMetaButtons(term, index);
                },
            );
        }
        return <NoneButton />;
    }

    createRelatedTermButtons(): JSX.Element | JSX.Element[] {
        if (this.props.foundRelatedTerms.length > 0) {
            return this.props.foundRelatedTerms.map(
                (term: string, index: number) => {
                    return this.createMetaButtons(term, index);
                },
            );
        }
        return <NoneButton />;
    }

    render(): React.ReactNode {
        return (
            <div className={'col-6'}>
                <h3>Parent terms:</h3>
                <div className="row">{this.createParentTermButtons()}</div>
                <h3>Child terms:</h3>
                <div className="row">{this.createChildTermButtons()}</div>
                <h3>Related terms:</h3>
                <div className="row">{this.createRelatedTermButtons()}</div>
            </div>
        );
    }
}

export default MetaTermList;
