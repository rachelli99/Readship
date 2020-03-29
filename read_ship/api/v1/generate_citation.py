import flask
from datetime import datetime
from read_ship import app
from read_ship.api.v1.generate_extract import generate_extract

@app.route('/api/v1/generate_citation/', methods=['POST'])
def api_generate_citation():
    """Generate citation from article."""
    # grab the url from body of POST request
    url = flask.request.json['url']

    # context dictonary for response
    context = dict()
    context['response'] = "success"

    # try to generate article citation
    try:
        generate_citation(context, url)
    except (Exception) as error:
        context['response'] = f'Error while generating citation: {error}'

    # return the article citation information
    return flask.jsonify(**context), 200


def generate_citation(context, url):
    """Core functionailty of generating citation."""
    # generate extract of article
    extract_context = dict()
    generate_extract(extract_context, url)

    # prepare extracted information
    author = extract_context["extract"]['author'].split(" ")
    title = extract_context["extract"]['title']
    publish_date = extract_context["extract"]['publishDate']

    # create citation using extracted information
    context['citation'] = f'{author[-1]}, {" ".join(author[:-1])}. "{title}". {publish_date}. {url}. Accessed {datetime.now()}.'
