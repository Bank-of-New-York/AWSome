FROM python:3.7-slim

RUN apt-get update \
 && apt-get -y upgrade \
 && apt-get install -y --no-install-recommends \
 python3-pip \
 vim \
 && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt

COPY ./app /app

RUN python models.py

RUN chmod 644 /app/__init__.py

ENTRYPOINT ["python"]
CMD ["__init__.py"]