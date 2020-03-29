import flask
from aylienapiclient import textapi
from read_ship import app

@app.route('/api/v1/generate_extract/', methods=['POST'])
def api_generate_extract():
    """Generate extract from article."""
    # grab the text from body of POST request
    data = flask.request.get_json()

    # context dictonary for response
    context = dict()
    context['response'] = "success"
    context['extract'] = None

    # try to extract article information using aylien-apiclient's text API
    try:
        generate_extract(context, data)
    except (Exception) as error:
        context['response'] = f'Error while generating extract: {error}'

    # return the extracted article information
    return flask.jsonify(**context), 200


def generate_extract(context, data):
    """Core functionailty of generating extract."""
    # call the aylien text api to generate extract
    client = textapi.Client(app.config['AYLIEN_ID'], app.config['AYLIEN_KEY'])
    extract = client.Extract(data)
    context['extract'] = extract
