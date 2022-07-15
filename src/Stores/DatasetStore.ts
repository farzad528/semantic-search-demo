import { DatasetDefinition, DatasetKind, QuerySuggestion } from "../Types";

// TODO: UPDATE DATASET HERE

const datasetDefinitions: DatasetDefinition[] = [
  {
    iconUrl: "/images/covid.png",
    name: "COVID-19 Open Research",
    datasetKind: DatasetKind.Cord,
    type: "Document",
    indexName: "cord-19-2020-11-01",
    fieldNames: [
      "title",
      "url",
      "Abstract",
      "authors",
      "journal",
      "doi",
      "body",
    ],
    keyField: "paper_id",
    captionFields: ["body", "Abstract"],
    titleField: "title",
    attributionField: "url",
  },
  {
    iconUrl: "images/docs.png",
    name: "Microsoft Docs",
    datasetKind: DatasetKind.Msdocs,
    type: "Document",
    indexName: "msdocs-monolingual-en-us",
    fieldNames: [
      "title",
      "urlPath",
      "description",
      "body",
      "scopes",
      "keywords",
      "products",
      "suites",
      "clouds",
      "apiNames",
      "region",
      "industry",
      "form",
      "devLang",
    ],
    keyField: "id",
    captionFields: ["body"],
    titleField: "title",
    attributionField: "url",
  },
  {
    iconUrl: "images/msmarco.png",
    name: "MS MARCO",
    datasetKind: DatasetKind.Msmarco,
    type: "Document",
    indexName: "msmarco-index-filterable",
    fieldNames: ["Title", "Url", "Body"],
    keyField: "Key",
    captionFields: ["Body"],
    titleField: "Title",
    attributionField: "Url",
  },
  {
    iconUrl: "images/msmarco.png",
    name: "Demo for " + process.env.REACT_APP_SEARCH_CUSTOMER_NAME,
    datasetKind: DatasetKind.YourDataset,
    type: "Document",
    indexName: process.env.REACT_APP_SEARCH_INDEX_NAME,
    fieldNames: ["url,file_name,keyPhrases,locations,people,links"],
    keyField: "id",
    captionFields: ["file_name"],
    titleField: "file_name",
    attributionField: "url",
  },
];

export const getDefaultDataset = () => DatasetKind.Cord;

export const getDataDatasetByKind = (datasetKind: DatasetKind) =>
  datasetDefinitions.find(
    (datasetDefinition) => datasetDefinition.datasetKind === datasetKind
  ) || datasetDefinitions[0];

export const getDataDatasetDefinitions = () => datasetDefinitions;

// TODO: UPDATE QUERY SUGGESTIONS HERE
export const defaultQuerySuggestions: QuerySuggestion[] = [
  {
    query: "What is Azure Sarch",
    semanticType: "SPELLER",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Msdocs),
  },
  {
    query: "How common is sore throat among covid 19 patients",
    semanticType: "SEMANTIC  RANKING",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Cord),
  },
  {
    query: "How long can I host a live event on Microsoft Teams?",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Msdocs),
  },
  {
    query: "What are COVID-19 symptoms?",
    semanticType: "CAPTIONS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Cord),
  },
  {
    query: 'H0031',
    semanticType: 'CAPTIONS',
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourDataset),
},
];
