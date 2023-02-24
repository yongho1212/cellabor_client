import AWS from "aws-sdk";

AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:f1312c6d-5d6d-49bd-9b44-7a3504d36aef",
    }),
  });




