import flask
from read_ship import app

@app.route('/keyword/', methods=['GET', 'POST'])
def view_keyword():
    """Flask route for keyword page."""
    context = {}
    context['view'] = "keyword"
    template = flask.render_template('read_ship.html', **context)

    return template
