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
