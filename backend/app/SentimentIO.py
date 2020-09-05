import requests
from Config import SENTIMENTIO_API_KEY

url = "https://socialsentiment.io/api/v1/sectors/"
querystring = None

def get_response(url, querystring):
  headers = {
    'Authorization': f"Token {SENTIMENTIO_API_KEY}"
  }
  response = requests.request("GET", url, headers=headers, params=querystring)
  try:
    response.raise_for_status()
    return response
  except requests.exceptions.HTTPError as e:
    # Whoops it wasn't a 200
    print("Error: " + str(e))


print(get_response(url, querystring).text)