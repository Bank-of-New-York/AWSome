import requests
from Config import YAHOO_API_KEY

def get_response(url, querystring):
  headers = {
    'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com",
    'x-rapidapi-key': YAHOO_API_KEY
  }
  return requests.request("GET", url, headers=headers, params=querystring)

def get_yf_id(query):
  url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete'
  querystring = {"lang":"en","region":"US","query": query}

  response = get_response(url, querystring).json()

  try:
    return response['ResultSet']['Result'][0]['symbol']
  except:
    return ''

def get_yf_analysis(stock_id):
  '''
  returns the estiated revenue in 1 year from Yahoo Finance
  '''
  url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis"
  querystring = {"symbol": stock_id}


  response = get_response(url, querystring).json()

  return_dict = {
    "Revenue 2021": None,
    "Gross Profit": None
  }

  if response == []:
    return return_dict
  else:
    for trend in response['earningsTrend']['trend']:
      if trend['period'] == '+1y':
        return_dict['Revenue 2021'] = trend['revenueEstimate']['avg']['raw']

    return_dict['Gross Profit'] = response['financialData']['grossProfits']['raw']

  return return_dict