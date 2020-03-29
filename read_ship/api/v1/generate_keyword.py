import flask
from read_ship import app
from newsapi import NewsApiClient

@app.route('/api/v1/generate_keyword/', methods=['POST'])
def api_generate_keyword():
    """Generate news articles by keyword search"""
    # grab the url and functions from body of POST request
    keyword = flask.request.json['url']

    # context dictonary for response
    context = dict()
    context['response'] = "success"

    # try to generate article recommendations
    try:
        generate_keyword(context, keyword)
    except (Exception) as error:
        context['response'] = f'Error while generating recommend: {error}'

    # return the extracted article information
    return flask.jsonify(**context), 200 #need modification


def generate_keyword(context, keyword):
    # call the news api to generate recommendations
    newsapi = NewsApiClient(api_key='39a90c1545454d559e4ef54af9f5fa44')
    context['keyword'] = []

    # get all info of the recommend news
    top_headlines = newsapi.get_top_headlines(
        q=keyword,
        category='business',
        language='en',
        country='us'
    )

    # get the number of results, cast the max as 10
    num = top_headlines["totalResults"]
    if num > 10: num = 10

    # filter the result to contain only title and url
    for j in range(num):
        title = top_headlines['articles'][j]["title"]
        url = top_headlines['articles'][j]["url"]
        description = top_headlines['articles'][j]["description"]
        result = (title, url, description)
        context['keyword'].append(result)
