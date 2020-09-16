import { RootState } from 'typesafe-actions';
import React from 'react';
import NoneButton from '../../../components/NoneButton';
import { connect } from 'react-redux';
import * as selectors from '../selectors';
import { Term } from 'MyModels';

const mapStateToProps = (state: RootState) => ({
    terms: selectors.getTerms(state.terms) as Term[],
});

type P = ReturnType<typeof mapStateToProps>;

interface S {}

class SelectedTerms extends React.Component<P, S> {
    createSelectedTermsList(): JSX.Element | JSX.Element[] {
        let SelectedTermsList: JSX.Element | JSX.Element[];
        const terms = this.props.terms as Term[];
        if (terms.length > 0) {
            SelectedTermsList = terms.map(
                (item: Term, index: number): JSX.Element => {
                    return (
                        <div
                            key={index}
                            className={'col-4 meta_term_item'}
                            {...{ termid: item.id }}
                            onClick={(event) => {
                                const TermId = event.currentTarget.attributes.getNamedItem(
                                    'termid',
                                )?.value;
                                console.log(event.currentTarget.attributes.getNamedItem('termid',)?.value);
                                if (TermId !== undefined) {
                                    this.removeSelectedTerm(TermId);
                                }
                            }}
                        >
                            {item.name}
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
        if (this.props.terms.some((term) => term.id === TermId)) {
            const Index = this.props.terms.findIndex(
                (term) => term.id === TermId,
            );
            const CurrentSelectedTerms = this.props.terms;
            CurrentSelectedTerms.splice(Index, 1);
            this.setState({
                selectedTerms: CurrentSelectedTerms,
            });
        }
    }

    render(): React.ReactNode {
        return <div className="row">{this.createSelectedTermsList()}</div>;
    }
}

export default connect(mapStateToProps)(SelectedTerms);
