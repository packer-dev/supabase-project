import { UseFieldArrayReturn } from "react-hook-form";

export type FormFields = {
  questionStartFrom: number;
  questionType: string;
  questionInstruction: string;
  questionTitle: string;
  givenHeadings?: {
    value: string;
  }[];
  givenInformation?: {
    title: string;
    items: {
      value: string;
    }[];
  } | null;
  questionList: {
    section: string;
    correctHeading: string;
  }[];
  multipleChoice: {
    content: string;
    answers: {
      content: string;
      is_new?: boolean;
      is_correct?: boolean;
    }[];
    is_done?: boolean;
  }[];
};

export const defaultValues = (isGivenHeading?: boolean) => {
  return {
    questionStartFrom: 2,
    ...(isGivenHeading
      ? {
          givenHeadings: [
            {
              value: "",
            },
          ],
        }
      : {
          givenInformation: {
            title: "",
            items: [
              {
                value: "",
              },
            ],
          },
        }),
    questionList: [
      {
        section: "",
        correctHeading: "",
      },
    ],
  };
};

export const questionTypes = [
  {
    label: "Yes/No/Not Given",
    value: "Yes/No/Not Given",
    mode: "yesNo",
    name: "",
  },
  {
    label: "True/False/Not Given",
    value: "True/False/Not Given",
    mode: "trueFalse",
    name: "",
  },
  {
    label: "Multiple choice",
    value: "Multiple choice",
    mode: "multipleChoice",
    name: "",
  },
  {
    label: "Matching Headings",
    value: "Matching Headings",
    mode: "headings",
    name: "Given headings",
  },
  {
    label: "Matching Information",
    value: "Matching Information",
    mode: "information",
    name: "Given information",
  },
  {
    label: "Matching Features",
    value: "Matching Features",
    mode: "information",
    name: "Given features",
  },
  {
    label: "Matching Sentence Endings",
    value: "Matching Sentence Endings",
    mode: "information",
    name: "Given sentence endings",
  },
  {
    label: "Sentence Completion",
    value: "Sentence Completion",
    mode: "completion",
    name: "Given words",
  },
  {
    label: "Summary Completion",
    value: "Summary Completion",
    mode: "completion",
    name: "Given words",
  },
];
