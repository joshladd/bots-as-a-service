import com.google.auth.Credentials
import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.storage.Bucket
import com.google.cloud.storage.BucketInfo
import com.google.cloud.storage.Storage
import com.google.cloud.storage.StorageOptions
import java.io.FileInputStream


/*
This is a pretty useless generic bot as it stands. It takes the list of subreddits from the config file,
and runs each of its services (also from config file) on each subreddit. It outputs a success message
for each service-subreddit combination to file, showing that the api call to grab the subreddit works.
Once we've defined what our bot services are going to be more thoroughly, I will add that functionality into
the BotService class and refactor the run() call for RedditBot

TODO (Josh)
- Read config files from GCP
- Run services as coroutines
- Add service-specific parameters to config file format
- Formalize output data scheme
 */



fun main() {

    var bot = RedditBot("src/main/resources/assets/config.json")
    bot.retrieveClient()
    bot.configureServices()
    bot.run()
    System.exit(0)


}