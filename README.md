# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### Lab 1 - Setup Environment

```
npm i -g npm serverless
git clone https://afanello@bitbucket.org/corpinfo/onica-create-2019-serverless.git
cd onica-create-2019-serverless
```

### Lab 2 - Create API with Lambda

#### Initialize Serverless Framework
```
cd onica-create-2019-serverless
sls create --template aws-nodejs --path api
cd api
sls deploy
sls invoke -f hello
sso-console
# Go to Lambda, us-east-1, Functions, api-dev-hello
```

#### Add request-unicorn Lambda

- Add RequestUnicorn section to `serverless.yml`
- Add `request-unicorn.js`
- `sls deploy`
- In AWS Console, go to API Gateway, APIs, dev-api, Resources, /ride, POST, TEST
  - Enter for Request Body: `{ "PickupLocation": "Millennium Biltmore Hotel" }`

#### Enable Authorizer

- Add Cognito authorizer in `serverless.yml`
- Uncomment lines under `TODO: authentication` in `request-unicorn.js`
- `sls deploy`

#### Update the Website Config

- Edit `website/js/config.js`
- Redeploy. Magic 🎩

#### DynamoDB

- Uncomment lines under `// TODO: Record to DynamoDB` in `request-unicorn.js`

### Who do I talk to? ###

* Project is based on [Wild Rydes](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/) by AWS.
* Onica-ized by Adam Fanello and Chris O'Malley.
