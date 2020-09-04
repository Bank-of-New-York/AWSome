from stocknews import StockNews
from Config import STOCK_NEWS_API_KEY


stocks = ['AAPL', 'MSFT', 'NFLX'] # change symbol accordingly http://eoddata.com/symbols.aspx

sn = StockNews(stocks, wt_key=STOCK_NEWS_API_KEY, news_file='news.csv', summary_file='data.csv')
# saves to /data file
# news.csv contains news titles, and cooresponding sentiment scores
# data.csv contains sentiment summaries for the day of each stock

df = sn.summarize()