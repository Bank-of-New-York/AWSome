import requests
from Config import X_RAPIAPI_KEY

# url = "https://seeking-alpha.p.rapidapi.com/auto-complete"
# querystring = {"term":"apple"}

# url = "https://seeking-alpha.p.rapidapi.com/market/get-realtime-prices"
# querystring = {"symbols":"aapl%2Ctsla"}

# url = "https://seeking-alpha.p.rapidapi.com/market/get-dividend-investing"
# querystring = None

# url = "https://seeking-alpha.p.rapidapi.com/news/list"
# querystring = {"until":"0","size":"20","id":"aapl"}

# url = "https://seeking-alpha.p.rapidapi.com/news/list-trending"
# querystring = {"id":"3611577"}

# url = "https://seeking-alpha.p.rapidapi.com/press-releases/list"
# querystring = {"until":"0","size":"20","id":"aapl"}

url = "https://seeking-alpha.p.rapidapi.com/press-releases/get-details"
querystring = {"id":"17991819"} # Change as required

def get_response(url, querystring):
  headers = {
    'x-rapidapi-host': "seeking-alpha.p.rapidapi.com",
    'x-rapidapi-key': X_RAPIAPI_KEY
  }
  response = requests.request("GET", url, headers=headers, params=querystring)
  try:
    response.raise_for_status()
    return response
  except requests.exceptions.HTTPError as e:
    # Whoops it wasn't a 200
    print("API Error: " + str(e))


print(get_response(url, querystring).text)