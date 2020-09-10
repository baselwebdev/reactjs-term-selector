import React, { HTMLAttributes } from 'react';
import SubjectMatter from '../data/thesaurus.json';
import NoneButton from './NoneButton';

interface SubjectMatterTerm {
    Name: string;
    ParentTerms: string[];
    RelatedTerms: string[];
    ChildTerms: string[];
    TermId: string;
}

interface P {
    value: string;
}

interface Term {
    Name: string;
    TermId: string;
}

interface SelectedTerms {
    Terms: Term[];
}

interface S {
    inputValue: string;
    selectedTerms: SelectedTerms | undefined;
    termId: string | boolean;
    showResultList: boolean;
    foundSearchedTerm: string | boolean;
    highlightedTermIndex: number;
    foundTerms: string[];
    foundParentTerms: string[];
    foundChildTerms: string[];
    foundRelatedTerms: string[];
}

class SearchForm extends React.Component<P, S> {
    Terms: SubjectMatterTerm[];

    constructor(props: P) {
        super(props);
        this.Terms = SubjectMatter;
        this.state = {
            inputValue: props.value,
            selectedTerms: { Terms: [] },
            termId: false,
            showResultList: true,
            foundSearchedTerm: false,
            highlightedTermIndex: -1,
            foundTerms: [],
            foundParentTerms: [],
            foundChildTerms: [],
            foundRelatedTerms: [],
        };
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

    createMetaButtons(term: string, index: number): JSX.Element {
        return (
            <div
                key={index}
                className={'col-4 meta_term_item'}
                onClick={() => {
                    this.searchTerms(term);
                    this.setState({ showResultList: false });
                }}
            >
                {term}
            </div>
        );
    }

    createParentTermButtons(): JSX.Element | JSX.Element[] {
        if (this.state.foundParentTerms.length > 0) {
            return this.state.foundParentTerms.map((term: string, index: number) => {
                return this.createMetaButtons(term, index);
            });
        }
        return <NoneButton />;
    }

    createChildTermButtons(): JSX.Element | JSX.Element[] {
        if (this.state.foundChildTerms.length > 0) {
            return this.state.foundChildTerms.map((term: string, index: number) => {
                return this.createMetaButtons(term, index);
            });
        }
        return <NoneButton />;
    }

    createRelatedTermButtons(): JSX.Element | JSX.Element[] {
        if (this.state.foundRelatedTerms.length > 0) {
            return this.state.foundRelatedTerms.map((term: string, index: number) => {
                return this.createMetaButtons(term, index);
            });
        }
        return <NoneButton />;
    }

    createAddTermButton(): JSX.Element {
        if (!this.isNewTerm() || this.state.foundSearchedTerm === false) {
            return <input type={'button'} value={'Add'} disabled />;
        }
        return <input type={'button'} value={'Add'} onClick={() => this.addTerm()} />;
    }

    addTerm(): void {
        const NetTerm: Term = {
            Name: this.state.inputValue,
            TermId: this.state.termId as string,
        };
        const CurrentSelectedTerms = this.state.selectedTerms;
        if (CurrentSelectedTerms?.Terms !== undefined && CurrentSelectedTerms?.Terms.push(NetTerm) > 0) {
            this.setState({
                selectedTerms: CurrentSelectedTerms,
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
        return !this.state.selectedTerms?.Terms.some((term) => term.TermId === this.state.termId);
    }

    createSelectedTermsList(): JSX.Element | JSX.Element[] {
        let SelectedTermsList: JSX.Element | JSX.Element[];
        if (this.state.selectedTerms !== undefined) {
            SelectedTermsList = this.state.selectedTerms?.Terms.map(
                (item: Term, index: number): JSX.Element => {
                    return (
                        <input
                            key={index}
                            type={'button'}
                            className={'col-4 meta_term_item'}
                            id={item.TermId}
                            value={item.Name}
                            onClick={(event) => this.removeSelectedTerm(event.currentTarget.id)}
                        />
                    );
                },
            );
        } else {
            SelectedTermsList = <NoneButton />;
        }
        return SelectedTermsList;
    }

    removeSelectedTerm(TermId: string): void {
        if (this.state.selectedTerms?.Terms !== undefined) {
            if (this.state.selectedTerms?.Terms.some((term) => term.TermId === TermId)) {
                const Index = this.state.selectedTerms?.Terms.findIndex((term) => term.TermId === TermId);
                const CurrentSelectedTerms = this.state.selectedTerms;
                CurrentSelectedTerms.Terms.splice(Index, 1);
                this.setState({
                    selectedTerms: CurrentSelectedTerms,
                });
            }
        }
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
                <div className={'col-6'}>
                    <h3>Selected terms:</h3>
                    <div className="row">{this.createSelectedTermsList()}</div>
                    <h3>Parent terms:</h3>
                    <div className="row">{this.createParentTermButtons()}</div>
                    <h3>Child terms:</h3>
                    <div className="row">{this.createChildTermButtons()}</div>
                    <h3>Related terms:</h3>
                    <div className="row">{this.createRelatedTermButtons()}</div>
                </div>
            </div>
        );
    }
}

export default SearchForm;
