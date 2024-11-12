/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const renderSchemaByType = (type: string): any => {
  switch (type) {
    // case "yesNo":
    //   return {

    //   };
    // case "trueFalse":
    //   return {};
    case "headings":
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
      };
    case "information":
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
      };
    case "multipleChoice":
      return {
        multipleChoice: yup.array().of(
          yup.object({
            content: yup.string(),
            answers: yup.array().of(
              yup.object({
                content: yup.string().required(),
                is_correct: yup.boolean().default(false),
                is_new: yup.boolean(),
              })
            ),
            is_done: yup.boolean().default(false),
          })
        ),
      };
    default:
      return {};
  }
};

const schema = (type: string) => {
  return yup
    .object({
      questionStartFrom: yup.number().required(),
      questionType: yup.string().required(),
      questionInstruction: yup.string(),
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
      ...renderSchemaByType(type),
    })
    .required();
};

export default schema;
