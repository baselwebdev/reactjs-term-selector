import React, {FormEvent} from 'react'

class SearchBox extends React.Component<any, any> {
    findTermItem(event: FormEvent<HTMLInputElement>): void {
    }

    render() {
        return (
            <form autoComplete={'off'} className={'col-6'}>
                <div className={'autocomplete'}>
                    <input id={'term_finder'} type={'text'} placeholder='Terms' onInput={this.findTermItem}/>
                </div>
                <input type={'submit'} value={'Add'} disabled/>
            </form>
        );
    }
}

export default SearchBox;