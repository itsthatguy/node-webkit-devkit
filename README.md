node-webkit-devkit
==========

## Developing

### Generating Assets:

While working on the project, you will need to generate the assets from source. Run the following command to rebuild the assets as they change.

```bash
$ gulp watch
```

NOTE: Edit the files in the `assets/` directory. Everything in the `app/` directory is moved there automatically with gulp, and is overwritten anytime a file in `src/` changes.

### Running the app:

This thing uses node-webkit. There are a couple scripts that are used to do a number of things when you start the app.

1. Ensure app dependencies are up to date
2. Ensure project dependencies are up to date
3. Start the app

On your end, just simply type the following command, and let the scripts do their magic.

```bash
$ npm start
```

