import React from 'react';
import NoneButton from '../../../components/NoneButton';
import { ISelectedTerms, ITerm } from '../../../react-app-env';
import { connect } from 'react-redux';

interface P {
    selectedTerms: ISelectedTerms;
}

interface S {
    selectedTerms: ISelectedTerms;
}

class SelectedTerms extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            selectedTerms: this.props.selectedTerms,
        };
    }

    createSelectedTermsList(): JSX.Element | JSX.Element[] {
        let SelectedTermsList: JSX.Element | JSX.Element[];
        if (this.props.selectedTerms.Terms.length > 0) {
            SelectedTermsList = this.props.selectedTerms.Terms.map(
                (item: ITerm, index: number): JSX.Element => {
                    return (
                        <div
                            key={index}
                            className={'col-4 meta_term_item'}
                            {...{ termid: item.TermId }}
                            onClick={(event) => {
                                const TermId = event.currentTarget.attributes.getNamedItem(
                                    'termid',
                                )?.value;
                                if (TermId !== undefined) {
                                    this.removeSelectedTerm(TermId);
                                }
                            }}
                        >
                            {item.Name}
                        </div>
                    );
                },
            );
        } else {
            SelectedTermsList = <NoneButton />;
        }
        return SelectedTermsList;
    }

    removeSelectedTerm(TermId: string): void {
        if (
            this.props.selectedTerms.Terms.some(
                (term) => term.TermId === TermId,
            )
        ) {
            const Index = this.props.selectedTerms.Terms.findIndex(
                (term) => term.TermId === TermId,
            );
            const CurrentSelectedTerms = this.props.selectedTerms;
            CurrentSelectedTerms.Terms.splice(Index, 1);
            this.setState({
                selectedTerms: CurrentSelectedTerms,
            });
        }
    }

    render(): React.ReactNode {
        return <div className="row">{this.createSelectedTermsList()}</div>;
    }
}

function mapStateToProps(state: ISelectedTerms) {
    return {
        selectedTerms: state,
    };
}

export default connect(mapStateToProps)(SelectedTerms);
