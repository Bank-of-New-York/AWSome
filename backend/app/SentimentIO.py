import requests
import datetime
from Config import SENTIMENTIO_API_KEY

import pandas as pd
import json

url = "https://socialsentiment.io/api/v1/stocks/{symbol}/sentiment/daily/"

def get_response(stock_symb, days_before=30):

  today = datetime.date.today()
  yesterday = today - datetime.timedelta(days=1)
  days_before = yesterday - datetime.timedelta(days=days_before)

  yesterday_str = yesterday.strftime("%Y-%m-%d")
  days_before_str = days_before.strftime("%Y-%m-%d")

  headers = {
    'Authorization': f"Token {SENTIMENTIO_API_KEY}"
  }
  url = f"https://socialsentiment.io/api/v1/stocks/{stock_symb.upper()}/sentiment/daily/?to_date={yesterday_str}&from_date={days_before_str}"
  response = requests.request("GET", url, headers=headers)
  try:
    response.raise_for_status()
    return response
  except requests.exceptions.HTTPError as e:
    # Whoops it wasn't a 200
    print("API Error: " + str(e))

def get_sentiments(stock_symb):

  print("Getting sentiments...")
  df = pd.DataFrame(json.loads(get_response(stock_symb).text))
  days_before_sentiment = df.iloc[0, :][5]
  yesterday_sentiment = df.iloc[-1, :][5]

  return yesterday_sentiment, days_before_sentiment


# df = pd.DataFrame(json.loads(get_response("FB", 90).text))
# df.to_csv("fb.csv", index=False)