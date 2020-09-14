import React, { HTMLAttributes } from 'react';
import SubjectMatter from '../data/thesaurus.json';
import MetaTermList from './MetaTermList';
import { ISelectedTerms, SubjectMatterTerm, ITerm, DispatchType } from '../react-app-env';
import { connect } from 'react-redux';
import * as ActionCreator from '../store/actionCreators';

interface P {
    selectedTerms: ISelectedTerms;
    onAdding: (dispatch: DispatchType) => void;
}

interface S {
    inputValue: string;
    selectedTerms: ISelectedTerms;
    termId: string | boolean;
    showResultList: boolean;
    foundSearchedTerm: string | boolean;
    highlightedTermIndex: number;
    foundTerms: string[];
    foundParentTerms: string[];
    foundChildTerms: string[];
    foundRelatedTerms: string[];
}

class SearchBox extends React.Component<P, S> {
    Terms: SubjectMatterTerm[];

    constructor(props: P) {
        super(props);
        this.Terms = SubjectMatter;
        this.state = {
            inputValue: '',
            selectedTerms: this.props.selectedTerms,
            termId: false,
            showResultList: true,
            foundSearchedTerm: false,
            highlightedTermIndex: -1,
            foundTerms: [],
            foundParentTerms: [],
            foundChildTerms: [],
            foundRelatedTerms: [],
        };
        this.handleMetaTermClick = this.handleMetaTermClick.bind(this);
    }

    searchTerms(SearchString: string): void {
        this.setSearchValue(SearchString);
        if (SearchString !== '') {
            this.findTermItem(SearchString);
        }
    }

    setSearchValue(SearchString: string): void {
        this.setState({
            inputValue: SearchString,
            foundTerms: [],
            termId: false,
            foundSearchedTerm: false,
            foundParentTerms: [],
            foundChildTerms: [],
            foundRelatedTerms: [],
        });
    }

    findTermItem(SearchString: string): void {
        const FoundTerms = [];
        let TermId: string | boolean = false;
        let FoundSearchedTerm: string | boolean = false;
        let FoundParentTerms: string[] = [];
        let FoundChildTerms: string[] = [];
        let FoundRelatedTerms: string[] = [];
        const TermsCount = this.Terms.length;
        for (let i = 0; i < TermsCount; i++) {
            if (this.Terms[i].Name.substr(0, SearchString.length).toUpperCase() === SearchString.toUpperCase()) {
                FoundTerms.push(this.Terms[i].Name);
                // Exact match found
                if (this.Terms[i].Name.toUpperCase() === SearchString.toUpperCase()) {
                    SearchString = this.Terms[i].Name;
                    TermId = this.Terms[i].TermId;
                    FoundSearchedTerm = this.Terms[i].Name;
                    FoundParentTerms = this.Terms[i].ParentTerms.map((pt: string) => {
                        return pt;
                    });
                    FoundChildTerms = this.Terms[i].ChildTerms.map((ct: string) => {
                        return ct;
                    });
                    FoundRelatedTerms = this.Terms[i].RelatedTerms.map((rt: string) => {
                        return rt;
                    });
                }
            }
        }
        this.setState({
            inputValue: SearchString,
            termId: TermId,
            foundTerms: FoundTerms,
            showResultList: true,
            highlightedTermIndex: -1,
            foundSearchedTerm: FoundSearchedTerm,
            foundParentTerms: FoundParentTerms,
            foundChildTerms: FoundChildTerms,
            foundRelatedTerms: FoundRelatedTerms,
        });
    }

    createSearchResultsLists(): JSX.Element | void {
        if (this.state.showResultList && this.state.foundTerms.length > 0) {
            const searchResultsList = this.state.foundTerms.map((term: string, index: number) => {
                return (
                    <div
                        key={index}
                        onClick={() => {
                            this.searchTerms(term);
                            this.setState({ showResultList: false });
                        }}
                        {...this.highLightFoundTermList(index)}
                    >
                        <strong>{term.substr(0, this.state.inputValue.length)}</strong>
                        {term.substr(this.state.inputValue.length)}
                    </div>
                );
            });

            return <div className={'autocomplete-items'}>{searchResultsList}</div>;
        }
    }

    createAddTermButton(): JSX.Element {
        if (!this.isNewTerm() || this.state.foundSearchedTerm === false) {
            return <input type={'button'} value={'Add'} disabled />;
        }
        return <input type={'button'} value={'Add'} onClick={() => this.addTerm()} />;
    }

    addTerm(): void {
        const NewTerm: ITerm = {
            Name: this.state.inputValue,
            TermId: this.state.termId as string,
        };
        const CurrentSelectedTerms = this.props.selectedTerms;
        if (CurrentSelectedTerms.Terms.push(NewTerm) > 0) {
            this.setState({
                selectedTerms: CurrentSelectedTerms,
                showResultList: false,
            });
        }
    }

    selectTerm(key: string): void {
        switch (key) {
            case 'ArrowDown':
                this.setState({
                    highlightedTermIndex: this.state.highlightedTermIndex + 1,
                });
                break;
            case 'ArrowUp':
                this.setState({
                    highlightedTermIndex: this.state.highlightedTermIndex - 1,
                });
                break;
            case 'Enter':
                this.searchTerms(this.state.foundTerms[this.state.highlightedTermIndex]);
                this.setState({ showResultList: false });
                break;
            default:
                break;
        }
    }

    highLightFoundTermList(index: number): HTMLAttributes<HTMLDivElement> {
        if (this.state.highlightedTermIndex === index) {
            return { className: 'autocomplete-active' };
        }
        return { className: 'autocomplete-inactive' };
    }

    isNewTerm(): boolean {
        return !this.state.selectedTerms.Terms.some((term) => term.TermId === this.state.termId);
    }

    handleMetaTermClick(term: string): void {
        this.searchTerms(term);
        this.setState({ showResultList: false });
    }

    render(): React.ReactNode {
        return (
            <div className={'row'}>
                <form autoComplete={'off'} className={'col-6'}>
                    <div className={'autocomplete'}>
                        <input
                            id={'term_finder'}
                            type={'text'}
                            placeholder="Terms"
                            value={this.state.inputValue}
                            onChange={(event) => this.searchTerms(event.target.value)}
                            onKeyDown={(event) => this.selectTerm(event.key)}
                        />
                        {this.createSearchResultsLists()}
                    </div>
                    {this.createAddTermButton()}
                </form>
                <MetaTermList
                    onClick={this.handleMetaTermClick}
                    foundParentTerms={this.state.foundParentTerms}
                    foundChildTerms={this.state.foundChildTerms}
                    foundRelatedTerms={this.state.foundRelatedTerms}
                />
            </div>
        );
    }
}

function mapStateToProps(state: ISelectedTerms) {
    return {
        selectedTerms: state,
    };
}

const dispatchToProps = {
    onAdding: ActionCreator.addTerm({ Name: 'hello', TermId: '12a31' }),
};

export default connect(mapStateToProps, dispatchToProps)(SearchBox);
