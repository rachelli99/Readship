import flask
from read_ship import app

@app.route('/summary/', methods=['GET', 'POST'])
def view_summary():
    """Flask route for summary page."""

    context = {}
    context['view'] = "summary"
    template = flask.render_template('read_ship.html', **context)

    return template
