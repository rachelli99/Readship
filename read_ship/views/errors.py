from flask import render_template
from read_ship import app

@app.errorhandler(404)
def page_not_found(e):
    context = {
        "first_num": 4,
        "third_num": 4
    }
    # note that we set the 404 status explicitly
    return render_template('errors.html', **context), 404

@app.errorhandler(400)
def bad_request(e):
    context = {
        "first_num": 4,
        "third_num": 0
    }
    # note that we set the 404 status explicitly
    return render_template('errors.html', **context), 400

@app.errorhandler(403)
def forbidden(e):
    context = {
        "first_num": 4,
        "third_num": 3
    }
    # note that we set the 404 status explicitly
    return render_template('errors.html', **context), 403

@app.errorhandler(408)
def request_timeout(e):
    context = {
        "first_num": 4,
        "third_num": 8
    }
    # note that we set the 404 status explicitly
    return render_template('errors.html', **context), 408

@app.errorhandler(500)
def internal_server_error(e):
    context = {
        "first_num": 5,
        "third_num": 0
    }
    # note that we set the 404 status explicitly
    return render_template('errors.html', **context), 500
