import * as yup from "yup";

const schema = (isGivenHeading?: boolean) => {
  const given = isGivenHeading
    ? yup
        .array()
        .of(
          yup
            .object({
              value: yup.string().required(),
            })
            .required()
        )
        .required()
    : yup
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
        .required();
  return yup
    .object({
      questionStartFrom: yup.number().required(),
      questionType: yup.string().required(),
      questionInstruction: yup.string().required(),
      questionTitle: yup.string().required(),
      ...{ [isGivenHeading ? "givenHeadings" : "givenInformation"]: given },
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
    })
    .required();
};

export default schema;
