import flask

# set up Flask
app = flask.Flask(__name__)

# configure the application
app.config.from_object('config')

# add read_ship API and Views
import read_ship.api
import read_ship.views
