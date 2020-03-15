### Reddit Username Availability Checker

This is a simple web-app that takes a text input, and returns whether that text is an available username on reddit, or if it is unavailable/invalid.

To try it out, here is a link to the heroku deployment:
[Reddit Username Checker](https://lit-wave-40531.herokuapp.com/)

#### Running Locally
To build this demo locally using docker, all that is needed is to run the `docker build` and `docker run` like so:

1) Open terminal and navigate to the enclosing directory for this demo ('/demo/username_checker')

2) run `docker build --tag desired-image-name .`
* don't forget the '.' at the end

3) check to ensure image exists with `docker image ls`

4) to run the built image, use `docker run -d -p 5000:5000 desired-image-name`

* the `-d` runs in a detached mode, so that you still have access to the console (Ctrl+C to detach is buggy for me, so this is easier)
* the `-p` specifies the port to be used
* lastly

5) to stop running the image, find the container id using `docker container ls` and copy the id matching your image name

6) run `docker stop IMAGE_ID` (image id will be some random stuff like "faa79426d349")


#### Deploying to Heroku

Deploying containers to heroku is really simple. Once you have verified that your build works locally, all that you need to do is issue a couple of heroku container commands to deploy your app.

1) init a git repository within the username_checker folder (I'd recommend moving this demo outside of the bots-as-a-service git repo before initializing for simplicity)

2) login to heroku: `heroku login`

3) login to heroku container service: `heroku container:login`

4) create a new heroku app: `heroku create`

5) now, if your local docker build is working, the next steps to deploy are very simple. 
* `heroku container:push web`
* `heroku container:release web'

6) all that's left is to open it with `heroku open`



