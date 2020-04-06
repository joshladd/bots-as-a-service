data class BotConfig (
    var subreddits : List<String>,
    var comments_enabled : Boolean,
    var livestream_enabled : Boolean,
    var keyphrase : String,
    var services: List<BotService>

)