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
    foundTerms: string[];
}

class SearchForm extends React.Component<P, S> {
    Terms: SubjectMatterTerm[];

    constructor(props: P) {
        super(props);
        this.Terms = SubjectMatter;
        this.state = {
            inputValue: props.value,
            foundTerms: [],
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
        });
    }

    findTermItem(SearchString: string): void {
        const FoundTerms = [];
        const TermsCount = this.Terms.length;
        for (let i = 0; i < TermsCount; i++) {
            // todo: Using search string instead of state. Using state its not updated to latest search string.
            if (this.Terms[i].Name.substr(0, SearchString.length).toUpperCase() === SearchString.toUpperCase()) {
                FoundTerms.push(this.Terms[i].Name);
            }
        }
        this.setState({
            foundTerms: FoundTerms,
        });
    }

    render() {
        let result: JSX.Element | JSX.Element[] = <div className={'no_term_items col-3'}>Nothing found</div>;
        if (this.state.foundTerms.length > 0) {
            result = this.state.foundTerms.map((term: string, index: number) => {
                return <p key={index}>{term}</p>;
            });
        }

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
                    </div>
                    <input type={'submit'} value={'Add'} disabled />
                    {result}
                </form>
                <div className={'col-6'}>
                    <h3>Parent terms:</h3>
                    <NoneButton />
                    <h3>Child terms:</h3>
                    <NoneButton />
                    <h3>Related terms:</h3>
                    <NoneButton />
                </div>
            </div>
        );
    }
}

export default SearchForm;
