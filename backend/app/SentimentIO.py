import requests
import datetime
from Config import SENTIMENTIO_API_KEY

url = "https://socialsentiment.io/api/v1/stocks/{symbol}/sentiment/daily/"

def get_response(stock_symb):

  today = datetime.date.today()
  yesterday = today - datetime.timedelta(days=1)
  day_90 = yesterday - datetime.timedelta(days=90)

  yesterday_str = yesterday.strftime("%Y-%m-%d")
  day_90_str = day_90.strftime("%Y-%m-%d")

  headers = {
    'Authorization': f"Token {SENTIMENTIO_API_KEY}"
  }
  url = f"https://socialsentiment.io/api/v1/stocks/{stock_symb.upper()}/sentiment/daily/?to_date={yesterday_str}&from_date={day_90_str}"
  response = requests.request("GET", url, headers=headers)
  try:
    response.raise_for_status()
    return response
  except requests.exceptions.HTTPError as e:
    # Whoops it wasn't a 200
    print("API Error: " + str(e))



# import pandas as pd
# import json
# df = pd.DataFrame(json.loads(get_response("TSLA").text))
# df.to_csv("TSLA.csv", index=False)