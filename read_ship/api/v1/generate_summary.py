import flask
from aylienapiclient import textapi
from read_ship import app

@app.route('/api/v1/generate_summary/', methods=['POST'])
def api_generate_summary():
    """Summarize text from article."""
    # grab the text from body of POST request
    data = flask.request.get_json()

    # context dictonary for response
    context = dict()
    context['response'] = "success"
    context['summary'] = None

    # try to summarize text using aylien-apiclient's text API
    try:
        generate_summary(context, data)
    except (Exception) as error:
        context['response'] = f'Error while generating summary: {error}'

    # return the summarized text
    return flask.jsonify(**context), 200

def generate_summary(context, data):
    """Core functionailty of generating summary."""
    # call the aylien text api to generate summary
    client = textapi.Client(app.config['AYLIEN_ID'], app.config['AYLIEN_KEY'])
    process = client.Summarize(data)
    process = process['sentences']
    summary = " ".join(process)
    context['summary'] = summary
