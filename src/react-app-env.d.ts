/// <reference types="react-scripts" />

interface ITerm {
    Name: string;
    TermId: string;
}

type TermsState = {
    Terms: ITerm[];
};

type TermAction = {
    type: string;
    term: ITerm;
};

type DispatchType = (args: TermAction) => TermAction;
