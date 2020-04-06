### The Most Basic Reddit Bot
This kotlin application uses the Java Reddit API Wrapper (JRAW) to initiate basic API requests based on the bot's configuration. The config files are written in JSON and contain bot-properties like its name and descriptions, as well as its OAuth and login credentials. Currently, these credentials are read from a local file, but the next step is to move these config files into Google Cloud Storage and to use the GCP API to remotely read and write these files.

Some basic properties of bot configuration that we have included are things like whether or not live threads are enabled, what sorts of posts (text, image, NSFW, pinned, etc), the subreddits to be active in, as well as parameters for the various services attached to the bot. However, the bot does not currently actualize these filters in this iteration.

We have yet to fully define the 'services' that will be the functional components of our bots, so the current iteration of the bot only performs simple API calls. 

To build the script, call `$ ./gradlew build` from terminal in this directory to initiate the tests for the bot.
