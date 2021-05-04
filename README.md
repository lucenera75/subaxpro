# 丂ㄩ乃闩乂尸尺ㄖ

### Super Basic Xml Api Proxy

---

### notes:

this tool uses optional chaining and some other features. Please run it with Node 14.

---

## Examples

### With Docker (preferred)

```
docker build . -t subaxpro

docker run -p 3000:3000 --rm \
-e baseXmlApiUrl="https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api/" \
--name subaxpro subaxpro


```

### With npm start (if you have to)

```
export baseXmlApiUrl=https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api/
npm start
```

### With nodemon (for dev)

```
export baseXmlApiUrl=https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api/
npm run dev
```

---

## Running tests

```
npm test
```

---

## Try it:

curl localhost:3000/companies/1

curl localhost:3000/companies/2

curl localhost:3000/companies/3

curl localhost:3000/companies/abc
