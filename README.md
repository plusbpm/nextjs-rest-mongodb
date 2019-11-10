## Usage

Clone rep and got to created dir

```shell
git clone git@github.com:plusbpm/nextjs-rest-mongodb.git
cd nextjs-rest-mongodb
```

Install  packages
```shell
npm install
```

Run development (need docker installed for mongo start):

```shell
npm run dev
```

Run production (need docker installed for mongo start):

```shell
npm run start
```

Start/stop with docker-compose:

```shell
npm run docker_up
npm run docker_stop
```

## Application environment
	.env.example - default and needed variables
	.env - current variables

## License

Licensed under [MIT](./LICENSE).