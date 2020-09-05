import requests
import json
from Config import GENERAL_NEWS_API_KEY

url = f"https://newsapi.org/v2/everything?apiKey={GENERAL_NEWS_API_KEY}&q=stock "

def get_news(querystring):
  response = requests.request("GET", url + querystring)
  try:
    response.raise_for_status()
    print(json.loads(response.text))
    return json.loads(response.text)
  except requests.exceptions.HTTPError as e:
    # Whoops it wasn't a 200
    print("API Error: " + str(e))


# print(get_news("MSFT"))