import requests
from Config import X_RAPIAPI_KEY

url = "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-full"

querystring = {"id":"aapl%3Aus"}
# querystring = {"id":"aapl%3Aus","interval":"y1"}

def get_response(url, querystring):
  headers = {
    'x-rapidapi-host': "bloomberg-market-and-financial-news.p.rapidapi.com",
    'x-rapidapi-key': X_RAPIAPI_KEY
  }
  return requests.request("GET", url, headers=headers, params=querystring)


print(get_response(url, querystring).text)