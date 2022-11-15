import { DatasetDefinition, DatasetKind, QuerySuggestion } from "../Types";

// TODO: UPDATE DATASET HERE

const datasetDefinitions: DatasetDefinition[] = [
  {
    iconUrl: "images/mydataset.png",
    name: "Demo for " + process.env.REACT_APP_SEARCH_CUSTOMER_NAME,
    datasetKind: DatasetKind.YourPrimaryDataset,
    type: "Document",
    indexName: process.env.REACT_APP_SEARCH_INDEX_NAME,
    fieldNames: [
      "id, docid, title_en_lucene, title_en_microsoft, text_en_lucene, text_en_microsoft",
    ],
    keyField: "id",
    captionFields: ["text_en_lucene"],
    titleField: "title_en_lucene",
    attributionField: "id",
    description: "Dataset of Wikipedia Articles"
  },
];

export const getDefaultDataset = () => DatasetKind.YourPrimaryDataset;

export const getDataDatasetByKind = (datasetKind: DatasetKind) =>
  datasetDefinitions.find(
    (datasetDefinition) => datasetDefinition.datasetKind === datasetKind
  ) || datasetDefinitions[0];

export const getDataDatasetDefinitions = () => datasetDefinitions;

// TODO: UPDATE QUERY SUGGESTIONS HERE
export const defaultQuerySuggestions: QuerySuggestion[] = [
  {
    query: "when did stern retire",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourPrimaryDataset),
  },
  {
    query: "qatar world cup",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourPrimaryDataset),
  },
  {
    query: "who bought chelsea fc",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourPrimaryDataset),
  },
  {
    query: "What is Lebanons Market cap",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourPrimaryDataset),
  },
];
