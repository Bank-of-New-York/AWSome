import yfinance as yf
import pandas as pd
import json

# MSFT is Microsoft
msft = yf.Ticker("MSFT")

# # get stock info
# stock_info = msft.info
# for key in stock_info:
#   stock_info[key] = [stock_info[key]]
# df1 = pd.DataFrame.from_dict(stock_info).T
# df1.to_csv("./api_samples/stock_info.csv")

# # get historical market data
# stock_history = msft.history(period="1y")
# stock_history.to_csv("./api_samples/stock_history.csv")

# show options expirations
# print(msft.options) 

# process historical market data into graph friendly form
def get_stock_hist_list(stock_symb, end_d, start_d):
  '''
  start_d format: yyyy-mm-dd
  Return stock price of stock at close from start to end in
  [{'x': <date>, 'y': <close price>, 'x':..}]
  '''
  stock = yf.Ticker(stock_symb)
  stock_history = stock.history(start=start_d, end=end_d)
  stock_close_history = stock_history.loc[:,["Close"]].reset_index()
  stock_close_history['Date'] = stock_close_history['Date'].apply(lambda x: x.strftime("%Y-%m-%d"))
  stock_close_history.columns = ['x', 'y']

  # print(stock_close_history.to_dict("records"))

  return stock_close_history.to_dict("records")


def get_stock_recommendations(stock_symb):
  stock = yf.Ticker(stock_symb)
  stock_history = stock.recommendations
  print(stock_history.index)

# get_stock_recommendations("MSFT")


# # show actions (dividends, splits)
# stock_actions = msft.actions
# stock_actions.to_csv("./api_samples/stock_dividends_splits.csv")

# # show dividends (Included in actions)
# print(msft.dividends)

# # show splits (Included in actions)
# print(msft.splits)

# # show sustainability
# stock_sustainability = msft.sustainability
# stock_sustainability.to_csv("./api_samples/stock_sustainability.csv")

# # show analysts recommendations
# stock_recommendations = msft.recommendations
# stock_recommendations.to_csv("./api_samples/stock_recommendations.csv")


# # get option chain for specific expiration
# opt = msft.option_chain('2021-01-01')
# # data available via: opt.calls, opt.puts
# print(opt.calls)