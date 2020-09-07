# Stock OverFlow

<!-- To start out with an apt investment plan for retirement is becoming increasingly complicated as useful information gets mixed with the rest. Besides the lack of financial knowledge, the lack of a clear direction in properly setting up an investment plan has caused many to fall into the pitfall of short-term trading without first understanding what they are investing in. -->

Stock OverFlow aims to empower new investors by creating a systematic structure to guide them along their planning and investing journey. By obtaining their personal financial requirements going into adulthood, and their risk levels, Stock OverFlow is able to recommend them a portfolio mix of stocks and bonds, as well as their monthly savings amount to reach their retirement goals. Users are also able to do quick research on stocks through our summarised dashboard, which includes a carefully curated quality score based on a few metrics, as well as the latest news and sentiment indicator on social media about the stocks.

## Team "AWSOME"

Built during the SMU Ellipsis Goldman Sachs Tech Series Hackathon.

### Analysts

- **Kang Wei** - [LinkedIn](https://www.linkedin.com/in/ongkangwei/)
- **Kenny** - [LinkedIn](https://www.linkedin.com/in/kpyh/)

### Developers

- **Tammi** - [LinkedIn](https://www.linkedin.com/in/tammi-chng/)
- **Phyo** - [LinkedIn](https://www.linkedin.com/in/yar-khine-phyo/)
- **Wa Thone** - [LinkedIn](https://www.linkedin.com/in/wathone/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You would require Docker Desktop, a PostgreSQL Database and subscriptions to APIs as listed below.

1. [Yahoo Finance by RapidAPI](https://rapidapi.com/apidojo/api/yahoo-finance1)
2. [Bloomberg by RapidAPI](https://rapidapi.com/apidojo/api/bloomberg-market-and-financial-news)
3. [News API](https://newsapi.org/)
4. [Sentiment IO](https://socialsentiment.io/api/v1/getting-started/)

### Installation & Deployment

For deploying Backend Flask REST API locally:

```
1) cd ./AWSome/backend/
2) docker build -t backend .
3) docker run \
-e DB_USER={postgres-db-username} \
-e DB_PW={postgres-db-password} \
-e DB_DB={postgres-db-database} \
-e DB_HOST={postgres-db-hostname} \
-e X_RAPIDAPI_KEY={rapidapi-apikey} \
-e GENERAL_NEWS_API_KEY={news-api-apikey} \
-e SENTIMENTIO_API_KEY={sentiment-io-apikey} \
-e SECRET_KEY={key-to-encode-web-tokens} \
-p 80:80 \
backend
```

For deploying React Application locally:

```
1) cd ./AWSome/frontend/awsome/
2) docker build -t frontend .
3) docker run \
-p 80:8080 \
frontend
```

Afterwards, it should be accessible via browser in localhost.


## Frameworks & Technologies

### Frameworks

- [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/) - Backend REST API
- [NGINX](https://www.nginx.com/) - Backend Web Server
- [SQLAlchemy](https://www.sqlalchemy.org/) - Object Relation Wrapper
- [PostgreSQL](https://www.postgresql.org/) - Relational Database
- [React](https://reactjs.org/) - Frontend Framework
- [Express](https://expressjs.com/) - Frontend Web Server


### Technologies
- [Docker](https://docs.docker.com/) - Containerization
- [AWS Fargate](https://aws.amazon.com/fargate/) - Load Balancer & Container Engine
- [AWS RDS](https://aws.amazon.com/rds/) - Relational Database


## Acknowledgments
- Frontend templates are adapted from [Datta Able](http://lite.codedthemes.com/datta-able/react/default/dashboard/default#)
- Huge thanks to [Social Sentiment.io](https://socialsentiment.io/api/v1/getting-started/) for blessing us with access to their API 
