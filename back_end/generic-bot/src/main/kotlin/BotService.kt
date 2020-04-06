import com.google.gson.Gson
import net.dean.jraw.RedditClient
import net.dean.jraw.models.Subreddit
import net.dean.jraw.references.SubredditReference
import java.io.File

/*
This class is going to hold all of the functionality of a given "service" or component that can be added
to the generic bot. We will need to add parameters for these services into the config file as we develop
non-dummy components, and will likely need to create a set of inherited classes to vary those parameters
and functions slightly across different component types.
 */
class BotService (
    var service_name : String,
    var language : String
) {
    private lateinit var subreddits : List<String>
    private lateinit var bot_name : String
    var configured = false

    /*
    TODO (Josh)
    - refactor RedditBot.run() into async calls to BotService.run()
    - determine if services output or bot itself
     */
    fun run(client : RedditClient, output_file : String = "src/main/resources/output/dev.json") {
        println("each service should just be callable to run")
    }

    fun configure(config : BotConfigMaster) {
        subreddits = config.getSubs()
        bot_name = config.name
        configured = true
    }

}