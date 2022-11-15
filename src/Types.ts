export interface QuerySuggestion {
  query: string;
  semanticType: string;
  datasetDefinition: DatasetDefinition;
}

export interface DatasetDefinition {
  iconUrl: string;
  name: any;
  datasetKind: DatasetKind;
  type: string;
  indexName: any;
  fieldNames: string[];
  keyField: string;
  captionFields: string[];
  titleField: string;
  attributionField?: string;
  description?: string;
}

export interface DocumentResult {
  title: string;
  attribution?: string;
  caption: string;
  id: string;
}

export enum DatasetKind {
  YourPrimaryDataset = 1,
  YourSecondaryDataset = 2,
  YourTertiaryDataset = 3,
}

export interface AzsSearchRequest {
  apiKey?: string;
  isQnAEnabled?: boolean;
  isSemanticSearch?: boolean;
  query: string;
  indexName: string;
  queryLanguage?: string | undefined;
  selectedFields?: string[];
  skip?: number;
  top?: number;
  speller?: "lexicon" | "standard" | "none" | undefined;
  datasetKind: DatasetKind;
  filter?: string;
}

export interface SearchResponseAnswer {
  key: string;
  text: string;
  highlights: string;
  score: number;
}

export interface SearchResponseCaption {
  text: string;
  highlights: string;
}

export interface SearchResponseDocument {
  "@search.score": number;
  "@search.rerankerScore": number;
  "@search.captions": SearchResponseCaption[];
  [key: string]: any;
}

export interface SearchResponse {
  "@odata.context": string;
  "@search.answers": SearchResponseAnswer[];
  "@odata.count": number;
  value: SearchResponseDocument[];
}

export interface PaginationState {
  itemsPerPage?: number;
  totalItemCount?: number;
  selectedPageIndex?: number;
}
