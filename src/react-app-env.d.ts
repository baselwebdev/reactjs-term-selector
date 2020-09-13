/// <reference types="react-scripts" />

export interface SubjectMatterTerm {
    Name: string;
    ParentTerms: string[];
    RelatedTerms: string[];
    ChildTerms: string[];
    TermId: string;
}

export interface ITerm {
    Name: string;
    TermId: string;
}

export type TermsState = {
    Terms: ITerm[];
};

export type TermAction = {
    type: string;
    term: ITerm;
};

export type DispatchType = (args: TermAction) => TermAction;

export interface ISelectedTerms {
    Terms: ITerm[];
}
