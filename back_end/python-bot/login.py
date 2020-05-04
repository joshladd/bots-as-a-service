import mechanize
import requests
import urllib
import json
from bs4 import BeautifulSoup as BS
import time
import re


def getMechClass(link):
	for i in link.attrs:
		if i[0] == 'class':
			return i[1]

username = "testing_dummy"
password = "leo030811"
user_agent = "baas/1.0"

action_url = "https://www.reddit.com/login"

br = mechanize.Browser()

cj = mechanize.CookieJar()
br.set_cookiejar(cj)

br.set_handle_equiv(True)
br.set_handle_gzip(True)
br.set_handle_redirect(True)
br.set_handle_referer(True)
br.set_handle_robots(False)
br.set_handle_refresh(mechanize._http.HTTPRefreshProcessor(), max_time=1)
time.sleep(1)
br.open("https://www.reddit.com/login")
time.sleep(1)
br.select_form(class_="AnimatedForm")
br.form['username'] = 'testing_dummy'
br.form['password'] = 'leo030811'
time.sleep(1)
br.submit()
time.sleep(1)
r = br.open("https://www.reddit.com/prefs/apps")

time.sleep(1)
soup = BS(r.read(),'html.parser')
app = soup.find('div',class_="edit-app-form")
print(app.prettify())
time.sleep(1)
client_id = app.find("input",{"name":"client_id"})['value']
print("id: " + client_id)
time.sleep(1)

client_secret_table = app.find_all("tr")
for row in client_secret_table:
	time.sleep(1)
	if row.th.text == 'secret':
		print('secret: ' + row.td.text)







# links = br.links(text_regex=re.compile('edit'))
# for l in links:
# 	print(l.absolute_url)
# 	if getMechClass(l) == 'edit-app-button':
# 		print(l)
# 		li = br.click_link(l)
# 		print(li.read())
# 		pass
