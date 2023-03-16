import { DatasetDefinition, DatasetKind, QuerySuggestion } from "../Types";

// TODO: UPDATE DATASET HERE
const datasetDefinitions: DatasetDefinition[] = [
  {
    iconUrl: "/images/covid.png",
    name: "COVID-19 Open Research",
    datasetKind: DatasetKind.Cord,
    type: "Document",
    indexName: "cord-19-trec-2022-08-02",
    keyField: "cord_uid",
    captionFields: ["body", "abstract"],
    titleField: "title",
    attributionField: "url",
    description:
      "The CORD-19 Research Dataset is a collection of over 400,000 scholarly articles about COVID-19, SARS-CoV-2, and related coronaviruses.",
  },
  {
    iconUrl: "images/docs.png",
    name: "Microsoft Docs",
    datasetKind: DatasetKind.Msdocs,
    type: "Document",
    indexName: "msdocs-2022-06-14",
    keyField: "id",
    captionFields: ["body_en_us"],
    titleField: "title_en_us",
    attributionField: "url_en_us",
    description:
      "This dataset contains a sample of content from Microsoft Docs, the home for documentation and learning for developers and IT pros.",
  },
  {
    iconUrl: "images/msmarco.png",
    name: "MS MARCO",
    datasetKind: DatasetKind.Msmarco,
    type: "Document",
    indexName: "msmarco-2022-06-14",
    keyField: "Key",
    captionFields: ["Body"],
    titleField: "Title",
    attributionField: "Url",
    description:
      "Microsoft Machine Reading Comprehension (MS MARCO) is a collection of large scale datasets for deep learning related to search.",
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
    query: "What is Azure Cognetive Search",
    semanticType: "SPELLER",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Msdocs),
  },
  {
    query: "How long has artificial intelligence been around?",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Msmarco),
  },
  {
    query: "How common is sore throat among covid 19 patients",
    semanticType: "SEMANTIC  RANKING",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Cord),
  },
  {
    query: "What is a line chart in Power BI?",
    semanticType: "ANSWERS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Msdocs),
  },
  {
    query: "What are COVID-19 symptoms?",
    semanticType: "CAPTIONS",
    datasetDefinition: getDataDatasetByKind(DatasetKind.Cord),
  },
];
