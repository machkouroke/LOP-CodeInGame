FROM python:3.10-slim-buster

WORKDIR /app

ADD . /app/api
COPY pyproject.toml /app
COPY .env /app
ENV PYTHONPATH=${PYTHONPATH}:${PWD}

RUN pip3 install poetry

RUN poetry config virtualenvs.create false

RUN poetry install --no-dev


EXPOSE $PORT
CMD uvicorn api.app:app --host 0.0.0.0 --port $PORT