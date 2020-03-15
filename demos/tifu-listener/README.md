### Reddit TIFU Post Grabber

This is a simple web-app that will get a random post from the TIFU subreddit at the push of a button.

To try it out, here is a link to the heroku deployment:
[TIFU Post Reader](https://murmuring-bastion-48696.herokuapp.com/)

#### Running Locally

This demo is currently configured for Heroku deployment in the Dockerfile. To run this locally, a couple of changes need to be made to the Application.kt source and the Dockerfile to set the port back to a specified localhost port.

Once that is handled, to build this demo locally using docker, all that is needed is to run the `docker build` and `docker run` similarly to how the username-checker demo was used.


#### Deploying to Heroku

Since this demo is set up for heroku deployment, simply following the commands below in a copy of this folder should successfully build and deploy the containerized web-app.


1) init a git repository within the username_checker folder (I'd recommend moving this demo outside of the bots-as-a-service git repo before initializing for simplicity)

2) login to heroku: `heroku login`

3) login to heroku container service: `heroku container:login`

4) create a new heroku app: `heroku create`

5) now, if your local docker build is working, the next steps to deploy are very simple. 
* `heroku container:push web`
* `heroku container:release web'

6) all that's left is to open it with `heroku open`



