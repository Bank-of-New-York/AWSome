import requests
from Config import SENTIMENTIO_API_KEY

url = "https://socialsentiment.io/api/v1/sectors/"
querystring = None

def get_response(url, querystring):
  headers = {
    'Authorization': f"Token {SENTIMENTIO_API_KEY}"
  }
  return requests.request("GET", url, headers=headers, params=querystring)


print(get_response(url, querystring).text)