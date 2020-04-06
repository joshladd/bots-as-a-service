import com.google.gson.Gson
import javafx.application.Application.launch
import net.dean.jraw.RedditClient
import net.dean.jraw.http.NetworkAdapter
import net.dean.jraw.http.OkHttpNetworkAdapter
import net.dean.jraw.http.UserAgent
import net.dean.jraw.oauth.Credentials
import net.dean.jraw.oauth.OAuthHelper
import java.io.File
import java.io.FileReader

/*
This class will hold all the functional components and configuration settings for an individual bot. It will have
its own private client instance and a list of service components to run on that client.
 */

class RedditBot(var config_url : String) {

    //probably don't need to all be lateinit
    private lateinit var config : BotConfigMaster
    private lateinit var client : RedditClient
    lateinit var subreddits : List<String>
    lateinit var services : List<BotService>
    private lateinit var auth : BotAuth

    //Getters
    fun getName() : String {
        return config.name
    }

    fun getReddit() : RedditClient {
        return client
    }

    fun getBotServices() : List<BotService> {
        return services
    }

    fun hasClient() : Boolean {
        return ::client.isInitialized
    }


    //Initializers
    fun loadConfig() {

        var gson = Gson()
        config = gson.fromJson(FileReader(config_url), BotConfigMaster::class.java)
    }

    fun retrieveClient() {
        var userAgent = UserAgent("linux",config.name,config.version,auth.username)
        var credentials = Credentials.script(
            auth.username,
            auth.password,
            auth.client_id,
            auth.client_secret
        )
        var adapter : NetworkAdapter = OkHttpNetworkAdapter(userAgent)
        client =  OAuthHelper.automatic(adapter,credentials)
        println(client.me().username)
    }


    /*
    Main run function. Currently not implementing coroutines or having BotServices contain their own functionality.
    Iterates through combinations of subreddits and services for the bot and makes an api call to the subreddit to
    get its name. Outputs filler text about service_name and subreddit to file for testing.

    TODO (Josh)
    - formalize output format (is it per-service or global across bots?)
    - refactor to include coroutines
    - should just need to call service.run() rather than making the API calls here
     */
    fun run(output_file : String = "src/main/resources/output/dev.json") {
        var output_strings = mutableListOf<String>()

        for (subreddit in subreddits) {
            var sub_info = client.subreddit(subreddit).about()
            for (service in services) {
                output_strings.add("running ${service.service_name} in /r/${sub_info.name}")
            }
            Thread.sleep(1000)
        }
        var gson = Gson()
        var output_data = mapOf("data" to output_strings)
        var jsonString = gson.toJson(output_data)
        var file = File(output_file)
        file.writeText(jsonString)
    }

    /*Currently not doing much of consequence. Will use to pass client instance to services for running their
    core component. Populates the subreddit list of the service (make accessing easier). This could be when we pass
    service-specific parameters to each service, which will be part of an updated config file down the road.
     */
    fun configureServices() {
        for (service in services) {
            service.configure(config)
        }
    }

    //Init block only loads config for testing purposes and also to prevent automatic retrieval of client without
    //confirmation of a good configuration
    init {
        loadConfig()
        subreddits = config.getSubs()
        services = config.getServices()
        auth = config.getAuth()
    }


}