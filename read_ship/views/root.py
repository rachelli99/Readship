import flask
from read_ship import app

@app.route('/', methods=['GET', 'POST'])
def view_root():
    """Flask route for root (about) page."""
    return flask.redirect(flask.url_for('view_about'))
