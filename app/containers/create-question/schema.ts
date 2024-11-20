/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

const renderSchemaByType = (type: string): any => {
  switch (type) {
    // case 'yesNo':
    //   return {

    //   };
    // case 'trueFalse':
    //   return {};
    case 'headings':
      return {
        givenHeadings: yup
          .array()
          .of(
            yup
              .object({
                value: yup.string().required(),
              })
              .required()
          )
          .required(),
        ...questionList,
      };
    case 'information':
      return {
        givenInformation: yup
          .object({
            title: yup.string().required(),
            items: yup
              .array()
              .of(
                yup
                  .object({
                    value: yup.string().required(),
                  })
                  .required()
              )
              .required(),
          })
          .required(),
        ...questionList,
      };
    case 'multipleChoice':
      return {
        multipleChoice: yup
          .array()
          .of(
            yup.object({
              question: yup.string().when('is_done', {
                is: false,
                then: (schema_) => schema_.required(),
                otherwise: (schema_) => schema_.optional(),
              }),
              answers: yup
                .array()
                .of(
                  yup.object({
                    content: yup.string().when('is_new', {
                      is: false,
                      then: (schema_) => schema_.required(),
                      otherwise: (schema_) => schema_.optional(),
                    }),
                    is_correct: yup.boolean().default(false),
                    is_new: yup.boolean(),
                  })
                )
                .required(),
              is_done: yup.boolean().default(false),
            })
          )
          .min(1)
          .required(),
      };
    default:
      return {};
  }
};

export const questionList = {
  questionTitle: yup.string().required(),
  questionList: yup
    .array()
    .of(
      yup
        .object({
          section: yup.string().required(),
          correctHeading: yup.string().required(),
        })
        .required()
    )
    .required(),
};

export const schema = (type: string) => {
  return yup
    .object({
      questionStartFrom: yup.number().required(),
      questionType: yup.string().required(),
      questionInstruction: yup.string(),
      ...renderSchemaByType(type),
    })
    .required();
};

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
    question: string;
    answers: {
      content: string;
      is_new?: boolean;
      is_correct?: boolean;
    }[];
    is_done?: boolean;
  }[];
  yesNo: { value: string }[];
  trueFalse: { value: string }[];
};

export const defaultValues = (type: string) => {
  let result = {};
  switch (type) {
    case 'headings':
      result = {
        givenHeadings: [
          {
            value: '',
          },
        ],
      };
      break;
    case 'information':
      result = {
        givenInformation: {
          title: '',
          items: [
            {
              value: '',
            },
          ],
        },
      };
      break;
    case 'multipleChoice':
      result = {
        multipleChoice: [
          {
            content: '',
            answers: [
              {
                content: '',
                is_new: true,
                is_correct: false,
              },
            ],
            is_done: false,
          },
        ],
      };
      break;
    default:
      break;
  }
  return {
    questionStartFrom: 2,
    ...result,
    questionList: [
      {
        section: '',
        correctHeading: '',
      },
    ],
  };
};

export const questionTypes = [
  {
    label: 'Yes/No/Not Given',
    value: 'Yes/No/Not Given',
    mode: 'yesNo',
    name: '',
  },
  {
    label: 'True/False/Not Given',
    value: 'True/False/Not Given',
    mode: 'trueFalse',
    name: '',
  },
  {
    label: 'Multiple choice',
    value: 'Multiple choice',
    mode: 'multipleChoice',
    name: '',
  },
  {
    label: 'Matching Headings',
    value: 'Matching Headings',
    mode: 'headings',
    name: 'Given headings',
  },
  {
    label: 'Matching Information',
    value: 'Matching Information',
    mode: 'information',
    name: 'Given information',
  },
  {
    label: 'Matching Features',
    value: 'Matching Features',
    mode: 'information',
    name: 'Given features',
  },
  {
    label: 'Matching Sentence Endings',
    value: 'Matching Sentence Endings',
    mode: 'information',
    name: 'Given sentence endings',
  },
  {
    label: 'Sentence Completion',
    value: 'Sentence Completion',
    mode: 'completion',
    name: 'Given words',
  },
  {
    label: 'Summary Completion',
    value: 'Summary Completion',
    mode: 'completion',
    name: 'Given words',
  },
];
