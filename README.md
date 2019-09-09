# README #

This repository provides the files needed for the Onica.create() 2019 Serverless session lab.

The instructions below tell you how to proceed with the lab, but *please* only don't get ahead!
Jumping ahead only leads to mistakes.

### Lab 1 - Setup Environment

- You need a laptop with Onica SSO setup.
- You need a development environment setup with Node.js 10 and an IDE. If you don't have that:
  - `sso-console` to launch AWS Console in your lab account.
  - Head over to the Cloud9 service.
  - Create a Cloud9 environment with defaults, **except set 60 minute timeout**.
- In command-line terminal:
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
- Explore your website (can't register yet)

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

- Add new function to `serverless.yml` by copying from `lab2/api/serverless.yml`.
  - You can copy the whole file, but take a look at it!
- Copy `request-unicorn.js` from `lab2/api`
- `sls deploy`
- In AWS Console, go to API Gateway, APIs, dev-api, Resources, /ride, POST, TEST
  - Enter for Request Body: `{ "PickupLocation": "Millennium Biltmore Hotel" }`

#### Deploy Cognito

- Copy `lab2/infrastructure` to `wildrydes`
- Add `infrastructure` and `api` modules to `runway.yml`. See `lab2/runway.yml`

```
cd wildrydes
runway deploy
```

#### Enable Authorizer

- Uncomment authorizer block in `serverless.yml`
- Uncomment lines under `TODO: authentication` comments in `request-unicorn.js`

#### Update the Website Config

- Edit `website/js/config.js` with Cognito and API Gateway values from:
  - AWS Console: Explore deployed Cognito User Pool.
  - AWS Console: Explore deployed API Gateway
    - Under your API, select `Stages`, and then `dev`. Copy this Invoke URL.

#### Deploy all

```
cd wildrydes
touch api/config-dev-us-east-1.yml
runway deploy
```

Magic 🎩
- Clear cache & Hard Reload web site
- Click GIDDY UP and register with your real email address
- Enter verification code from email.
  - If email not received, click user in Cognito and then click the Confirm User button. Edit browser address to `signin.html`.

### Lab 3 - Store ryde history

#### Create & Use DynamoDB

- Uncomment `ddbrides` section in `infrastructure/stacks.yaml`
- Give the lambda IAM permissions to write to the DynamoDB table, and the name of the table.
  - Edit `serverless.yml` and
    - uncomment the `iamRoleStatements` section
    - uncomment the `RIDES_TABLE_NAME` environment variable.
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
