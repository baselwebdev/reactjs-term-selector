import React from 'react';
import SubjectMatter from '../data/thesaurus.json';

class SearchForm extends React.Component<any, any> {
    Terms: any;

    constructor(props:  Readonly<any>) {
        super(props);
        this.Terms = SubjectMatter;
        this.state = {
            inputValue: ''
        };
    }

    searchTerms(SearchString: string): void {
        this.setSearchValue(SearchString);
        this.findTermItem();
    }

    setSearchValue(SearchString: string): void {
        this.setState({
            inputValue: SearchString
        });
    }

    findTermItem(): void {
        const TermsCount = this.Terms.length;
        for (let i = 0; i < TermsCount; i++) {
            console.log(this.Terms[i].Name.toUpperCase() === this.state.inputValue.toUpperCase());
            if (this.Terms[i].Name.toUpperCase() === this.state.inputValue.toUpperCase()) {
                console.log('Found ' + this.Terms[i].Name);
            }
        }
    }

    render() {
        return (
            <form autoComplete={'off'} className={'col-6'}>
                <div className={'autocomplete'}>
                    <input id={'term_finder'}
                           type={'text'}
                           placeholder='Terms'
                           value={this.state.inputValue}
                           onChange={event => this.searchTerms(event.target.value)}
                    />
                </div>
                <input type={'submit'} value={'Add'} disabled/>
            </form>
        );
    }
}

export default SearchForm;