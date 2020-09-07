import React from 'react';
import SubjectMatter from '../data/thesaurus.json';
import NoneButton from './NoneButton';

export interface SubjectMatterTerm {
    Name: string;
    ParentTerms: string[];
    RelatedTerms: string[];
    ChildTerms: string[];
    TermId: string;
}

export interface P {
    value: string;
}

export interface S {
    inputValue: string;
    foundSearchedTerm: string | boolean;
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
            foundSearchedTerm: false,
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
            foundSearchedTerm: false,
            foundParentTerms: [],
            foundChildTerms: [],
            foundRelatedTerms: [],
        });
    }

    findTermItem(SearchString: string): void {
        const FoundTerms = [];
        let FoundSearchedTerm: string | boolean = false;
        let FoundParentTerms: string[] = [];
        let FoundChildTerms: string[] = [];
        let FoundRelatedTerms: string[] = [];
        const TermsCount = this.Terms.length;
        for (let i = 0; i < TermsCount; i++) {
            // todo: Using search string instead of state. Using state its not updated to latest search string.
            if (this.Terms[i].Name.substr(0, SearchString.length).toUpperCase() === SearchString.toUpperCase()) {
                FoundTerms.push(this.Terms[i].Name);
                if (this.Terms[i].Name.toUpperCase() === SearchString.toUpperCase()) {
                    SearchString = this.Terms[i].Name;
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
            foundTerms: FoundTerms,
            foundSearchedTerm: FoundSearchedTerm,
            foundParentTerms: FoundParentTerms,
            foundChildTerms: FoundChildTerms,
            foundRelatedTerms: FoundRelatedTerms,
        });
    }

    createSearchResultsLists(): JSX.Element {
        const searchResultsList = this.state.foundTerms.map((term: string, index: number) => {
            return (
                <div key={index}>
                    <strong>{term.substr(0, this.state.inputValue.length)}</strong>
                    {term.substr(this.state.inputValue.length)}
                </div>
            );
        });

        return <div className={'autocomplete-items'}>{searchResultsList}</div>;
    }

    createParentTermButtons(): JSX.Element[] {
        return this.state.foundParentTerms.map((term: string, index: number) => {
            return (
                <div key={index} className={'col-4 meta_term_item'}>
                    {term}
                </div>
            );
        });
    }

    createChildTermButtons(): JSX.Element[] {
        return this.state.foundChildTerms.map((term: string, index: number) => {
            return (
                <div key={index} className={'col-4 meta_term_item'}>
                    {term}
                </div>
            );
        });
    }

    createRelatedTermButtons(): JSX.Element[] {
        return this.state.foundRelatedTerms.map((term: string, index: number) => {
            return (
                <div key={index} className={'col-4 meta_term_item'}>
                    {term}
                </div>
            );
        });
    }

    renderAddTermButton(): JSX.Element {
        if (this.state.foundSearchedTerm === false) {
            return <input type={'submit'} value={'Add'} disabled />;
        }
        return <input type={'submit'} value={'Add'} />;
    }

    render() {
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
                        />
                        {this.state.foundTerms.length > 0 && this.createSearchResultsLists()}
                    </div>
                    {this.renderAddTermButton()}
                </form>
                <div className={'col-6'}>
                    <h3>Parent terms:</h3>
                    <div className="row">
                        {this.state.foundParentTerms.length > 0 ? this.createParentTermButtons() : <NoneButton />}
                    </div>
                    <h3>Child terms:</h3>
                    <div className="row">
                        {this.state.foundParentTerms.length > 0 ? this.createChildTermButtons() : <NoneButton />}
                    </div>
                    <h3>Related terms:</h3>
                    <div className="row">
                        {this.state.foundParentTerms.length > 0 ? this.createRelatedTermButtons() : <NoneButton />}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;
