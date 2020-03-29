import flask
from google.cloud import texttospeech
from read_ship import app

@app.route('/api/v1/text_to_speech/', methods=['POST'])
def api_text_to_speech():
    """Generate mp4 from text."""
    # grab the text from body of POST request
    text = flask.request.json['text']

    # context dictonary for response
    context = dict()
    context['response'] = "success"

    # try to generate mp4 from text
    try:
        text_to_speech(context, text)
    except (Exception) as error:
        context['response'] = f'Error while generating mp3 file: {error}'

    # return the summarized text
    return flask.jsonify(**context), 200


def text_to_speech(context, text):
    """Core functionailty of generating mp4 from text."""
    # call the google cloud api to generate mp4
    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.types.SynthesisInput(text=text)
    voice = texttospeech.types.VoiceSelectionParams(
        language_code='en-US',
        name='en-US-Standard-C',
        ssml_gender=texttospeech.enums.SsmlVoiceGender.FEMALE
    )
    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3
    )
    response = client.synthesize_speech(input_text, voice, audio_config)
    with open('read_ship/static/mp3/output.mp3', 'wb') as out:
        out.write(response.audio_content)
        print('Audio content written to file "output.mp3"')
    context['mp3_file'] = '/static/mp3/output.mp3'
