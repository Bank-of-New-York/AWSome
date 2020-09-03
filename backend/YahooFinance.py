import yfinance as yf
import pandas as pd
import json

# MSFT is Microsoft
msft = yf.Ticker("MSFT")

# get stock info
stock_info = msft.info
for key in msft_info:
  stock_info[key] = [stock_info[key]]
df1 = pd.DataFrame.from_dict(stock_info).T
df1.to_csv("./api_samples/stock_info.csv")

# get historical market data
stock_history = msft.history(period="1y")
stock_history.to_csv("./api_samples/stock_history.csv")

# show actions (dividends, splits)
stock_actions = msft.actions
stock_actions.to_csv("./api_samples/stock_dividends_splits.csv")

# show dividends (Included in actions)
print(msft.dividends)

# show splits (Included in actions)
print(msft.splits)

# show sustainability
stock_sustainability = msft.sustainability
stock_sustainability.to_csv("./api_samples/stock_sustainability.csv")

# show analysts recommendations
stock_recommendations = msft.recommendations
stock_recommendations.to_csv("./api_samples/stock_recommendations.csv")

# show options expirations
print(msft.options) 

# get option chain for specific expiration
opt = msft.option_chain('2021-01-01')
# data available via: opt.calls, opt.puts
print(opt.calls)