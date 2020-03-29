import flask
from aylienapiclient import textapi
from read_ship import app

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'

@app.route('/api/v1/generate_hashtags/', methods=['POST'])
def api_generate_hashtags():
    """Generate hashtags from article."""
    # grab the text from body of POST request
    data = flask.request.get_json()

    # context dictonary for response
    context = dict()
    context['response'] = "success"
    context['hashtags'] = None

    # try to get relevant hastags using aylien-apiclient's text API
    try:
        generate_hashtags(context, data)
    except (Exception) as error:
        context['response'] = f'Error while generating hastags: {error}'

    # return the hashtags
    return flask.jsonify(**context), 200


def generate_hashtags(context, data):
    """Core functionailty of generating hashtags."""
    # call the aylien text api to generate hashtags
    client = textapi.Client(app.config['AYLIEN_ID'], app.config['AYLIEN_KEY'])
    process = client.Hashtags(data)
    process = process['hashtags']
    context['hashtags'] = process
