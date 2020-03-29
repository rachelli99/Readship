import flask
from read_ship import app

@app.route('/about/', methods=['GET', 'POST'])
def view_about():
    """Flask route for about page."""
    context = {}
    context['view'] = "about"
    template = flask.render_template('read_ship.html', **context)

    return template
