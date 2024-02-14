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

### Hello

* `http://localhost:4242/?hello={"name":"f.rosito"}`

### Auth

* `http://localhost:4242/?auth={"login":"f.rosito","password":"f.rosito"}`

### Get system information

* `http://localhost:4242/?getSystemInfos={}`

