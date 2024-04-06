# challenge-api

Api made to practice my backend skills

## Tecnologies

* TypeScript
* Express
* Zod
* Jsonwebtokens
* Bcryptjs

## Requirenments

* [**Bun**](https://bun.sh)

## To install dependencies:

```sh
bun install
```

## To start:

1. Copy the .env file
```sh
cp .env.template .env
```

2. Needs some environment variables in order to connect to the database
> [!NOTE]
> This project uses a database in Turso so we need the database url and the auth token.
> Also we need a JWT secret

3. Start development server
```sh
bun run dev
```

> [!NOTE]
> ``bun start`` to just start the api

## Recomendations

### VSCode extensions

* [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
* [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)