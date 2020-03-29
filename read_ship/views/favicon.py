import flask
import os
from read_ship import app

@app.route('/favicon.ico/', methods=['GET'])
def view_favicon():
    """Flask route for favicon."""
    return flask.send_from_directory(
        os.path.join(app.root_path, 'static/img/'),
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )
