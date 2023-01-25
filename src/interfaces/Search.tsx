export interface Search {
  query?: string
}

//TS needs a specified form element
export interface FormElement extends HTMLFormControlsCollection {
  searchInput: HTMLInputElement
}

export interface SearchForm extends HTMLFormElement {
  readonly elements: FormElement
}
