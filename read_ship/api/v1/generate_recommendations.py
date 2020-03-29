import flask
from read_ship import app
from read_ship.api.v1.generate_hashtags import generate_hashtags
from newsapi import NewsApiClient

@app.route('/api/v1/generate_recommendations/', methods=['POST'])
def api_generate_recommendations():
    """Recommend similar articles."""
    # grab the url and functions from body of POST request
    url = flask.request.json['url']

    # context dictonary for response
    context = dict()
    context['response'] = "success"

    # try to generate article recommendations
    try:
        generate_recommendations(context, url)
    except (Exception) as error:
        context['response'] = f'Error while generating recommend: {error}'

    # return the extracted article information
    return flask.jsonify(**context), 200 #need modification


def generate_recommendations(context, url):
    """Core functionailty of generating recommendations."""
    # generate hashtags of article
    hashtags_context = dict()
    generate_hashtags(hashtags_context, url)

    # call the news api to generate recommendations
    newsapi = NewsApiClient(api_key='39a90c1545454d559e4ef54af9f5fa44')
    context['recommendations'] = []

    # iterate through all tags and use each tag to search until 3 recommendations are found
    for i in range(len(hashtags_context['hashtags'])):
        # string slice off the # in the beginning
        new_tag = hashtags_context['hashtags'][i][1:]

        # get all info of the recommendations news
        top_headlines = newsapi.get_top_headlines(
            q=new_tag,
            category='business',
            language='en',
            country='us'
        )

        # filter the result to contain only title and url
        num = top_headlines["totalResults"]
        for j in range(num):
            title = top_headlines['articles'][j]["title"]
            url = top_headlines['articles'][j]["url"]
            print(title)
            print(url)
            result = (title, url)
            context['recommendations'].append(result)
            if len(context['recommendations']) == 3:
                break

        # contain only 3 final links
        if len(context['recommendations']) == 3:
            break
