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
      "id, content",
    ],
    keyField: "id",
    captionFields: ["content"],
    titleField: "id",
    attributionField: "",
    description: "Dataset of Contose Cooking"
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
    query: "how long to bake a cheesecake",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourPrimaryDataset),
  },
  {
    query: "spaghetti",
    semanticType: "SPELLER",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourPrimaryDataset),
  },
  {
    query: "spicy food",
    semanticType: "CAPTIONS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourPrimaryDataset),
  },
];
