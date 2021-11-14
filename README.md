# Lamda function to get geoJSON Features from a given bounding box using openstreetmap api 0.6

I would like to say thank you so much for letting me to take this challenge. I Hopefully you'll like the way that i followed to get this job done. and i'm very excited and looking forward for feedback from you about this implementation to learn from it and take your notes as concediration to develop my skils and push myself to the next level.
ps: i just want you to know i focued only the backend side for this task.

## Run locally

```bash
docker-compose up
```

The applications will start on `http://localhost:3000`

if you don't want use docker jsut run

```bash
npm run dev
```

PS: use serveless framework 1.x.x for offline development env

### Dev Plugins

This boilerplate contains following plugins for local development:

- [serverless-offline](https://github.com/dherault/serverless-offline/issues) - For run API Gateway local and manage plugins
- [serverless-plugin-split-stacks](https://github.com/dougmoscrop/serverless-plugin-split-stacks) - Split Cloudformation Templates

## Production environment

### Deploy full services

```bash
serverless deploy -v
```

### Deploy a function

```bash
serverless deploy function -f functionName
```

### Get function logs

```bash
serverless functionName -f
```

### Clean All

```bash
serverless remove
```

## Unit Testing

```bash
npm run unit-test
```

## api docs

Get geojson-features data details for a given bbox based on openstreetmap api.

```bash
curl -H "x-api-key: API_KEY" https://ghz3wrm79l.execute-api.eu-central-1.amazonaws.com/prod/api/v1/geojson-features/?bbox=13.38798,52.52326,13.38954,52.52389
```

diffrent responses:
Forbidden: 403 when you don't provide the api key

```json
{
  "message": "Forbidden"
}
```

Success: 200 and body data will be like:

```json
{
    "data": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "id": "way/24314976",.......
            }......]
        .........}
```

Bad Request: 400 and error message

```json
{
  "error": "The parameter bbox is required, and must be of the form min_lon,min_lat,max_lon,max_lat."
}
```

## error handling and success responses

I added simple error handling way
1- Bad request with status 40x => return { error: "error text"}
2- success response with status 200 => return { data }
3- Internal server error with status 500 => return { error: "error text"}

## security

to secure this lamda function and due to the time for this task i decided to use api-key powered by aws api gateway service.

## Things to be enhanced

-1 to make response much faster we can use:

- use the cache to cache the rest api response if the user request the same bounding box and the expiration time for example month like google maps recommaned to cache geodata with thier api.

- maybe as good suggestion for bigsize bbox to split it into chunks and send multi requests and at the end gather the chunks to get the wanted bbox.

-3 Concerned big size bbox openstreetmapt recommands to planet.osm to request bigsize bbox. there's also recommandation to use overpass apis to stream big size geodata from openstreetmap overpass apis.

-4 for logging and monitoring i use aws lamda built in logging system.
