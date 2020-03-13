package com.example

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.client.*
import io.ktor.client.engine.apache.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.html.*
import kotlinx.html.*
import kotlinx.css.*
import freemarker.cache.*
import io.ktor.freemarker.*
import io.ktor.features.*
import io.ktor.http.content.PartData
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.*
import org.slf4j.event.*

fun main() {
    val port = System.getenv("PORT")?.toInt() ?: 8080

    embeddedServer(Netty, port , module = Application::module ).start(wait = true)
}


fun Application.module() {
    routing {
        get("/") {
            call.respondHtml {
                head {
                    title { +"The Bad Bot Name Generator" }
                }
                body {
                    p {
                        +"The Bad Bot Name Generator"
                    }
                    form("/generate", encType = FormEncType.textPlain, method = FormMethod.post) {
                        acceptCharset = "ascii"
                        p {
                            label { +"Number of Names:" }
                            textInput { name = "textField" }
                        }
                        p {
                            submitInput { value = "Generate Names" }
                        }
                    }
                }
            }
        }
        get("/?") {
            call.respondHtml {
                head {
                    title { +"The Bad Bot Name Generator" }
                }
                body {
                    p {
                        +"The Bad Bot Name Generator"
                    }
                    form("/generate", encType = FormEncType.textPlain, method = FormMethod.post) {
                        acceptCharset = "ascii"
                        p {
                            label { +"Number of Names:" }
                            textInput { name = "textField" }
                        }
                        p {
                            submitInput { value = "Generate Names" }
                        }
                    }
                }
            }
        }
        post ("/") {
            call.respondHtml {
                head {
                    title { +"The Bad Bot Name Generator" }
                }
                body {
                    p {
                        +"The Bad Bot Name Generator"
                    }
                    form("/generate", encType = FormEncType.textPlain, method = FormMethod.post) {
                        acceptCharset = "ascii"
                        p {
                            label { +"Number of Names:" }
                            textInput { name = "textField" }
                        }
                        p {
                            submitInput { value = "Generate Names" }
                        }
                    }
                }
            }

        }
        post("/generate") {

            var multipart = call.receiveText()
            var temp = multipart.split('=')[1].trim().toIntOrNull()
            if (temp !is Int) {
                call.respondHtml {
                    head {
                        title { +"The Bad Bot Name Generator" }
                    }
                    body {
                        h3 {
                            +"Generated $temp Bot Names\n"
                        }

                        p {
                            +"Oh wait, $temp isn't an integer!"
                        }


                        form("/", encType = FormEncType.textPlain, method = FormMethod.post) {
                            acceptCharset = "ascii"
                            p {
                                submitInput { value = "Try Again" }
                            }
                        }
                    }
                }
            }
            else {
                call.respondHtml {
                    head {
                        title { +"The Bad Bot Name Generator" }
                    }
                    body {
                        h3 {
                            +"Generated $temp Bot Names\n"
                        }

                        val firstnames = arrayOf("lemon", "heavy", "batty", "cheeky", "cruel", "elegant", "greasy", "lucky")
                        val lastnames = arrayOf("money", "picture", "box", "bear", "window", "tree", "pigeon", "apple")
                        for (i in 1..temp) {
                            val randomInteger = (0..7).shuffled()
                            val bot_name = i.toString() + ". " + firstnames[randomInteger[0]] + " " + lastnames[randomInteger[1]]
                            p {
                                +bot_name
                            }
                        }

                        form("/", encType = FormEncType.textPlain, method = FormMethod.get) {
                            acceptCharset = "ascii"
                            p {
                                submitInput { value = "Generate More Names" }
                            }
                        }
                    }
                }

            }
        }
    }
}
