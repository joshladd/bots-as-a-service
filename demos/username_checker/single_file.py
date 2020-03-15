from flask import Flask, render_template, request
import praw
import json
import os


app = Flask(__name__)

@app.route('/')
def homepage():
	return render_template('hello.html')

@app.route('/',methods=["POST"])
def check():
	username = request.form['text']
	

	reddit = praw.Reddit(client_id='mxwGgfh6jfNKQA',
                     client_secret='RrnL-uIxqUEoF7yDMh_J1bkJpb0',
                     password='leo030811',
                     user_agent='username checker',
                     username='BaaS_Master')
	status = reddit.request('get','/api/username_available',params={'user':username})
	if isinstance(status,dict):
		status = "INVALID"
		username = " " + username + " "
	elif status == False:
		status = "UNAVAILABLE"
	else:
		status = "AVAILABLE"

	print(status)
	print(username)
	return render_template('hello.html',username=username,status=str(status))



if __name__ == '__main__':
	app.run(host='0.0.0.0',port=os.environ.get('PORT'))