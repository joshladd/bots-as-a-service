package com.example

import io.ktor.application.Application
import io.ktor.application.ApplicationCall
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.html.respondHtml
import io.ktor.http.ContentType
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import kotlinx.css.CSSBuilder
import kotlinx.html.*
import net.dean.jraw.http.NetworkAdapter
import net.dean.jraw.http.OkHttpNetworkAdapter
import net.dean.jraw.http.UserAgent
import net.dean.jraw.oauth.Credentials
import net.dean.jraw.oauth.OAuthHelper


fun main() {
    val port = System.getenv("PORT")?.toInt() ?: 8080
    embeddedServer(Netty,port=port,module = Application::module).start(wait=true)

}



fun Application.module() {
    val credentials: Credentials = Credentials.script(
        "BaaS_Master", "leo030811",
        "mxwGgfh6jfNKQA", "RrnL-uIxqUEoF7yDMh_J1bkJpb0"
    )

    val userAgent = UserAgent("bot", "simple listener", "v0.1", "BaaS_Master")

    val adapter: NetworkAdapter = OkHttpNetworkAdapter(userAgent)

    val reddit = OAuthHelper.automatic(adapter, credentials)








    routing {
        get("/") {
            call.respondHtml {
                head {
                    title { +"TIFU Reader" }
                }
                body {

                    form("/", encType = FormEncType.textPlain, method = FormMethod.post) {
                        acceptCharset = "ascii"
                        p {
                            submitInput { value = "RANDOM TIFU POST" }
                        }
                    }
                }
            }
        }

        post ("/") {
            val sub = reddit.subreddit("tifu")
            val post = sub.randomSubmission()
            val submission = post.subject
            val sub_title = submission.title
            val text = submission.selfText
            while (submission.isSelfPost == false) {
                val sub = reddit.subreddit("tifu")
                val post = sub.randomSubmission()
                val submission = post.subject
                val sub_title = submission.title
                val text = submission.selfText
            }


            call.respondHtml {
                head {
                    title { +"TIFU Reader" }
                }
                body {

                    form("/", encType = FormEncType.textPlain, method = FormMethod.post) {
                        acceptCharset = "ascii"
                        p {
                            submitInput { value = "RANDOM TIFU POST" }
                        }
                    }
                    h4 {+sub_title }
                    p {+"$text"}
                }
            }

        }





    }
}


data class IndexData(val items: List<Int>)

fun FlowOrMetaDataContent.styleCss(builder: CSSBuilder.() -> Unit) {
    style(type = ContentType.Text.CSS.toString()) {
        +CSSBuilder().apply(builder).toString()
    }
}

fun CommonAttributeGroupFacade.style(builder: CSSBuilder.() -> Unit) {
    this.style = CSSBuilder().apply(builder).toString().trim()
}

suspend inline fun ApplicationCall.respondCss(builder: CSSBuilder.() -> Unit) {
    this.respondText(CSSBuilder().apply(builder).toString(), ContentType.Text.CSS)
}
