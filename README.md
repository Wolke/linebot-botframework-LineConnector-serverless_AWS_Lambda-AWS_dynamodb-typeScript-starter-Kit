# use
change serverless.yml service name to your setting
serverless deploy // this can create AWS dynamoDB table.
add config.js
```
//LINE setting
exports.default = 
{
    "channelId": "xxx",
    "channelSecret": "xxxxxxxx",
    "channelAccessToken": "xxxxxxxxxxxx",
    "domainName": "xxx.com" // it`s up to you , if you do not need custom domain , remove this
}
```
npm run dev
```serverless.yml 
if you don`t need custom domain, remove below
  - serverless-domain-manager
custom:
  customDomain:
    domainName: ${file(./config.json):domainName}
    basePath: dev
    stage: ${self:provider.stage}
    createRoute53Record: true

```