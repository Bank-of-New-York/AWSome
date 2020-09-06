import requests
from Config import X_RAPIAPI_KEY
import sys

url = "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-full"

querystring = {"id":"aapl%3Aus"}
# querystring = {"id":"aapl%3Aus","interval":"y1"}

def get_response(url, querystring):
  headers = {
    'x-rapidapi-host': "bloomberg-market-and-financial-news.p.rapidapi.com",
    'x-rapidapi-key': X_RAPIAPI_KEY
  }
  response = requests.request("GET", url, headers=headers, params=querystring)
  try:
    response.raise_for_status()
    return response
  except requests.exceptions.HTTPError as e:
    # Whoops it wasn't a 200
    print("Error: " + str(e))


def get_bb_id(query):
  '''
  returns the bloomberg stock id to be used for other queries
  '''
  url = "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete"
  querystring = {"query": query}

  response = get_response(url, querystring)

  try:
    return response.json()['quote'][0]['id']
  except:
    return ''


def get_bb_statistics(stock_id):
  '''
  returns Metrics in return_dict stock_id from Boomberg statistics
  '''
  url = "https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-statistics"
  querystring = {"id": stock_id}

  # result = response['result'][0]['table']
  return_dict = {
    "Current P/E Ratio (ttm)": None,
    "Est. PEG Ratio": None,
    "Market Cap (M)": None,
    "Dividend Indicated Gross Yield": None,
    "Average Volume (30-day)": None
  }
  
  try:
    result = get_response(url, querystring).json()['result']
  except:
    print("Unexpected error:", sys.exc_info()[0], "for bb statistics", stock_id)
    return return_dict

  if result == []:
    return return_dict
    
  for stat in result:
    if stat['name'] == 'Key Statistics':
      for table in stat['table']:
        if table['name'] in return_dict.keys():
          value = table['value']
          if '%' in value:
            percentage = round(float(value.replace('%','')) / 100, 5)
            return_dict[table['name']] = percentage
          else:
            return_dict[table['name']] = float(value.replace(',', ''))
      break

  return return_dict


def get_bb_financials(stock_id):
  '''
  returns Metrics in return_dict stock_id from Boomberg financials
  '''
  url = "https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-financials"
  querystring = {"id": stock_id}

  return_dict = {
    "Total Assets": None, 
    "Debt to Assets": None,
    "Revenue -3y": None,
    "Revenue -1y": None
  }

  try:
    result = get_response(url, querystring).json()['result']
  except:
    print("Unexpected error:", sys.exc_info()[0], "for bb financials", stock_id)
    return return_dict
  
  if result == []:
    return return_dict


  for stat in result:
    if stat['name'] == 'Balance Sheet':
      for balancesheet in stat['timeBasedSheets']:
        if balancesheet['name'] == 'Annual':
          for chartdata in balancesheet['chartData']:
            if chartdata['name'] in return_dict.keys():
              return_dict[chartdata['name']] = chartdata['values'][-1]

          break

    if stat['name'] == 'Income Statement':
      for time_based_sheets in stat['timeBasedSheets']:
        if time_based_sheets['name'] == 'Annual':
          for chartdata in time_based_sheets['chartData']:
            if chartdata['name'] == 'Revenue':
              # contains annual revenue values from 2016 - 2019
              revenue_values = chartdata['values']
              try:
                # growth over past 2 years: ( ( year0 - year(-2) ) ^0.5 ) - 1
                # growth_past_2 = ( (revenue_values[3] / revenue_values[1]) ** 0.5 ) - 1
                return_dict['Revenue -3y'] = revenue_values[1]
                return_dict['Revenue -1y'] = revenue_values[3]
              except:
                return_dict['Revenue -3y'] = None
                return_dict['Revenue -1y'] = None

              break
          break
        
  return return_dict

# print(get_bb_statistics('AAPL:US'))
# print(get_bb_financials('AAPL:US'))