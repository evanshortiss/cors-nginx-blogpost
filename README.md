# Avoiding CORS with an NGINX Proxy

## Deploy on OpenShift



## Local Development

Requirements:

* Node.js v18
* JDK v17
* Maven v3.8

Start the Quarkus backend:

```bash
cd quarkus-backend
./mvnw quarkus:dev
```

Then start the React frontend:

```bash
cd react-ui
npm run dev

```

## Enabling CORS on the Backend

If you'd like to experiment with CORS enabled on the Quarkus backend, you can configure CORS per the [Quarkus HTTP Reference](https://quarkus.io/guides/http-reference).

For example, to allow any domain to access the Quarkus backend:

```bash
QUARKUS_HTTP_CORS=true \
QUARKUS_HTTP_CORS_ORIGINS=* \
./mvnw quarkus:dev
```

Of course, the idea behind this example is to avoid the need to do this by using
NGINX as a proxy!