import flask
from read_ship import app
from read_ship.api.v1.generate_extract import generate_extract
from read_ship.api.v1.generate_hashtags import generate_hashtags
from read_ship.api.v1.generate_recommendations import generate_recommendations
from read_ship.api.v1.generate_summary import generate_summary

@app.route('/api/v1/generate_combined/', methods=['POST'])
def api_generate_combined():
    """Generate combination of API calls from article (only works for urls)."""
    # grab the url and functions from body of POST request
    url = flask.request.json['url']
    functions = flask.request.json['functions']

    # context dictonary for response
    context = dict()
    context['response'] = "success"

    # dictonary of available API functions
    api_functions = {
        'extract': generate_extract,
        'hashtags': generate_hashtags,
        'recommendations': generate_recommendations,
        'summary': generate_summary
    }

    # call all specified API functions
    for function in functions:
        try:
            api_functions[function](context, url)
        except (Exception) as error:
            print(function, error)
            context['response'] = f'Error while generating {function}: {error}'

    # return the extracted article information
    return flask.jsonify(**context), 200
