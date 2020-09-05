import requests
from Config import YAHOO_API_KEY

def get_response(url, querystring):
  headers = {
    'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com",
    'x-rapidapi-key': YAHOO_API_KEY
  }
  response = requests.request("GET", url, headers=headers, params=querystring)
  try:
    response.raise_for_status()
    return response
  except requests.exceptions.HTTPError as e:
    # Whoops it wasn't a 200
    print("Error: " + str(e))

def get_yf_id(query):
  '''
  get stock symbol/id to be used for other queries in Yahoo Finance
  '''
  url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete'
  querystring = {"lang":"en","region":"US","query": query}

  response = get_response(url, querystring).json()

  try:
    return response['ResultSet']['Result'][0]['symbol']
  except:
    return ''


def get_yf_analysis(stock_id):
  '''
  returns the estimated revenue in 1 yr and annual gross profit from Yahoo Finance analysis
  '''
  url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis"
  querystring = {"symbol": stock_id}


  response = get_response(url, querystring).json()

  return_dict = {
    "Revenue +1y": None,
    "Gross Profit": None
  }

  if response == []:
    return return_dict
  else:
    for trend in response['earningsTrend']['trend']:
      if trend['period'] == '+1y':
        return_dict['Revenue +1y'] = trend['revenueEstimate']['avg']['raw']

    return_dict['Gross Profit'] = response['financialData']['grossProfits']['raw']

  return return_dict


def get_yf_financials(stock_id):
  '''
  returns the raw Beta from Yahoo Finance financials
  '''
  url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials"
  querystring = {"symbol": stock_id}


  response = get_response(url, querystring).json()

  return_dict = {
    "Beta": None
  }

  if response == []:
    return return_dict
  else:
    return_dict['Beta'] = response['summaryDetail']['beta']['raw']

  return return_dict

# print(get_yf_financials("AAPL"))