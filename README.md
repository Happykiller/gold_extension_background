# gold_extension_background
The background part of the extension for the service Gold

## Install

* `npm i`

## Developpement

* `npm run start`
* Attention for request from chrome create shortcut
* `"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security  --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp`

## Build

* `npm run build`

### Acess token 

* You can provide a access token with `&accessToken=...`

### Hello

* `http://localhost:4242/?hello={"name":"f.rosito"}`

### Auth

* `http://localhost:4242/?auth={"login":"f.rosito","password":"f.rosito"}`

### Get system information

* `http://localhost:4242/?getSystemInfos={}`

### Create operation

* `http://localhost:4242/?createOperation={"amount":42.42,"date":"2024-02-14","description":"a description","account_id":2,"status_id": 2,"type_id": 2,"third_id":2,"category_id":1}`

### Get Session info

* `http://localhost:4242/?getSessionInfo={}&acessToken=`