import os

# ONLY 500 REQUESTS A MONTH (Will have to rotate accounts)
X_RAPIAPI_KEY = os.environ.get('X_RAPIDAPI_KEY') 

# Preminum account. Cannot leak to public
SENTIMENTIO_API_KEY = os.environ.get('SENTIMENTIO_API_KEY') 


POSTGRES = {
    'user': os.environ.get('DB_USER'),
    'pw': os.environ.get('DB_PW'),
    'db': os.environ.get('DB_DB'),
    'host': os.environ.get('DB_HOST'),
    'port': 5432,
}


DB_URI = 'postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES

SECRET_KEY = os.environ.get('SECRET_KEY')

STOCK_NEWS_API_KEY = os.environ.get('STOCK_NEWS_API_KEY')

GENERAL_NEWS_API_KEY = os.environ.get('GENERAL_NEWS_API_KEY')