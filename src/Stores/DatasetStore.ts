import { DatasetDefinition, DatasetKind, QuerySuggestion } from "../Types";

// TODO: UPDATE DATASET HERE

const datasetDefinitions: DatasetDefinition[] = [
  {
    iconUrl: "images/mydataset.png",
    name: "Demo for " + process.env.REACT_APP_SEARCH_CUSTOMER_NAME,
    datasetKind: DatasetKind.YourDataset,
    type: "Document",
    indexName: process.env.REACT_APP_SEARCH_INDEX_NAME,
    fieldNames: [
      "AzureSearch_DocumentKey, Survey_Job_Title, Survey_Job_Desc",
    ],
    keyField: "AzureSearch_DocumentKey",
    captionFields: ["Survey_Job_Desc"],
    titleField: "Survey_Job_Title",
    attributionField: "",
    description: "Dataset of Job Descriptions"
  },
];

export const getDefaultDataset = () => DatasetKind.YourDataset;

export const getDataDatasetByKind = (datasetKind: DatasetKind) =>
  datasetDefinitions.find(
    (datasetDefinition) => datasetDefinition.datasetKind === datasetKind
  ) || datasetDefinitions[0];

export const getDataDatasetDefinitions = () => datasetDefinitions;

// TODO: UPDATE QUERY SUGGESTIONS HERE
export const defaultQuerySuggestions: QuerySuggestion[] = [
  {
    query: "Accountant",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourDataset),
  },
  {
    query: "qatar world cup",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourDataset),
  },
  {
    query: "who bought chelsea fc",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourDataset),
  },
  {
    query: "What is Lebanons Market cap",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.YourDataset),
  },
];
