# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### Lab 1 - Setup Environment

- Start Cloud9 with defaults, **except set 60 minute timeout**.
- In Cloud9 terminal:
```
wget http://tbd/onica-create-2019-serverless.zip
unzip onica-create-2019-serverless.zip
mkdir wildrydes
cd wildrydes
git init
cp -r ../lab1/* .

npm i -g npm serverless itprokyle-runway2@0.0.2
export DEPLOY_ENVIRONMENT=dev
runway deploy
```

- First deploy of CloudFront can take 20+ minutes!
- AWS Console: Go to CloudFront and find URL to web app.
- Debug Website with Javascript console in browser (website should throw errors because backend doesn't exist yet)

### Lab 2 - Create API with Lambda

#### Initialize Serverless Framework
```
cd wildrydes
sls create --template aws-nodejs --path api
cd api
npm init # required for runway. name: wildrydes-api
# give it a unique name and accept defaults for everything else
sls deploy
sls invoke -f hello
```
- AWS Console: Go to Lambda, us-east-1, Functions, api-dev-hello

#### Add request-unicorn Lambda

- Add RequestUnicorn section to `serverless.yml` from `lab2/api/serverless.yml`
- Copy `request-unicorn.js` from `lab2/api`
- `sls deploy`
- In AWS Console, go to API Gateway, APIs, dev-api, Resources, /ride, POST, TEST
  - Enter for Request Body: `{ "PickupLocation": "Millennium Biltmore Hotel" }`

#### Deploy Cognito

- Copy `lab2/infrastructure` to `wildrydes`
- Add infrastructure and api modules to `runway.yml`. See `lab2/runway.yml`

```
cd wildrydes
runway deploy
```

#### Enable Authorizer

- Add Cognito authorizer in `serverless.yml`
- Uncomment lines under `TODO: authentication` comments in `request-unicorn.js`

#### Update the Website Config

- AWS Console: Explore deployed Cognito User Pool.
- AWS Console: Explore deployed API Gateway
- Edit `website/js/config.js` with Cognito and API Gateway

#### Deploy all

```
cd wildrydes
touch api/config-dev-us-east-1.yml
runway deploy
```

Magic 🎩

### Lab 3 - Store ryde history

#### Create & Use DynamoDB

- Uncomment `ddbrides` section in `infrastructure/stacks.yaml`
- Uncomment lines under `// TODO: Record to DynamoDB` comment in `request-unicorn.js`

#### Redeploy all

```
cd wildrydes
runway deploy
```

- AWS Console: View table in DynamoDB
- Reload web site and request a Unicorn
- AWS Console: View ryde in DynamoDB

### Who do I talk to?

* Project is based on [Wild Rydes](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/) by AWS.
* Onica-ized by Adam Fanello and Chris O'Malley.
