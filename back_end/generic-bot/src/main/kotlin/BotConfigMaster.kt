/*
This is the class that holds our config.json in a kotlin data structure. It has separate BotAuth
and BotConfig (confusing, need to rename) elements to hold the nested properties in our config
file. I hope to replace the BotStatus element with a Map<> at some point, as it's a mostly
empty data structure.
 */

data class BotConfigMaster (
    var name : String,
    var version : String,
    private var auth : BotAuth,
    var status : BotStatus,
    var config : BotConfig
) {
    //Getters
    fun getSubs() : List<String> {
        return config.subreddits
    }
    fun getServices() : List<BotService> {
        return config.services
    }
    fun getAuth() : BotAuth{
        return auth
    }

    /*
    Prints the current configuration settings to the console.
    TODO (Josh)
     - refactor into __str__ method to directly print data structure
     */
    fun displayConfig() {
        println("\n")
        println("|Name: ${name}")
        println("|Version: ${version}")
        println("  |Auth:")
        println("    |Client ID: ${auth.client_id}")
        println("    |Client Secret: ${auth.client_secret}")
        println("    |Username: ${auth.username}")
        println("    |Password: ${auth.password}")
        println("    |User Agent: ${auth.user_agent}")
        println("  |Status:")
        println("    |Online: ${status.online}")
        println("    |Valid: ${status.valid}")
        println("  |Config:")
        println("    |Subreddits:")

        for (sub in config.subreddits) {
            println("      |${sub}")
        }

        println("    |Comments Enabled: ${config.comments_enabled}")
        println("    |Live Stream Enabled: ${config.livestream_enabled}")
        println("    |Keyphrase: ${config.keyphrase}")
        println("    |Services: ")

        for (service in config.services) {

            println("      |Service Name: ${service.service_name}")
            println("      |Language: ${service.language}")
            println("")

        }

    }

}