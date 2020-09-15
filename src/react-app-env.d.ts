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

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare interface NodeModule {
    hot?: { accept: (path: string, callback: () => void) => void };
}

declare interface System {
    import<T = any>(module: string): Promise<T>;
}
declare let System: System;

declare const process: any;
declare const require: any;
