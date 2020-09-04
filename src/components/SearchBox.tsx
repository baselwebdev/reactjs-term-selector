import React from 'react';
import SubjectMatter from '../data/thesaurus.json';

export interface SubjectMatterTerm {
    Name: string;
    ParentTerms: string[];
    RelatedTerms: string[];
    ChildTerms: string[];
    TermId: string;
}

export interface P {
    status: boolean;
}

export interface S {
    inputValue: string;
    foundTerms: [];
}

class SearchForm extends React.Component<P, S> {
    Terms: SubjectMatterTerm[];

    constructor(props: Readonly<P>) {
        super(props);
        this.Terms = SubjectMatter;
        this.state = {
            inputValue: '',
            foundTerms: [],
        };
    }

    searchTerms(SearchString: string): void {
        this.setSearchValue(SearchString);
        this.findTermItem(SearchString);
    }

    setSearchValue(SearchString: string): void {
        this.setState({
            inputValue: SearchString,
        });
    }

    findTermItem(SearchString: string): void {
        const FoundTerms = [];
        const TermsCount = this.Terms.length;
        for (let i = 0; i < TermsCount; i++) {
            if (this.Terms[i].Name.substr(0, SearchString.length).toUpperCase() === SearchString.toUpperCase()) {
                console.log('Found ' + this.Terms[i].Name);
                FoundTerms.push(this.Terms[i].Name);
            }
        }
    }

    render() {
        return (
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
            </form>
        );
    }
}

export default SearchForm;
