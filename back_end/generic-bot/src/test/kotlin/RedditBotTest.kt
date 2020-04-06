import org.junit.Before
import org.junit.Test
import junit.framework.TestCase.*
import java.io.File

/*
Series of basic tests for our generic bot
 */
class RedditBotTest {
    var bot_client = RedditBot("src/main/resources/assets/config.json")
    var bot_no_client = RedditBot("src/main/resources/assets/config.json")

    @Before
    fun before() {
        bot_client.retrieveClient()
    }

    //testing whether the config file loads correctly using a known example
    @Test
    fun load_config() {
        assertEquals(bot_client.getName(),"Bots-as-a-service Master Controller")
    }

    //checks whether the lateinit client has been initialized
    @Test
    fun client_initialized() {
        assertTrue(bot_client.hasClient())
        assertFalse(bot_no_client.hasClient())
    }

    //checks the functionality of the initialized client by seeing if the user logged in matches what we expect
    @Test
    fun api_access() {
        var client = bot_client.getReddit()
        assertEquals(client.me().username,"BaaS_Master")
    }

    //checks whether service has been configured by the bot using its config file (currently useless)
    @Test
    fun services_configured() {
        var services = bot_client.getBotServices()
        val test = {service : BotService -> service.configured}
        assertFalse(services.all(test))
        bot_client.configureServices()
        assertTrue(services.all(test))
    }

    //checks whether the test run of the client actually grabs each subreddit
    //and makes new file to log output (currently junk output)
    @Test
    fun run_completed() {
        var file = File("src/main/resources/output/test.json")
        assertFalse(file.exists())
        bot_client.run(output_file = "src/main/resources/output/test.json")
        file = File("src/main/resources/output/test.json")
        assertTrue(file.exists())
        file.delete()
    }


    /*
    Future Tests Necessary (once functionality is developed):
    - File I/O through Google Cloud Platform
    - Tests for each service component we define
    - Rate limiting to prevent hitting API call limit
    - Tests for coroutines
     */

}