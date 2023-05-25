import logging

from flask_pymongo.wrappers import Database


class MongoHandler(logging.Handler):
    def __init__(self, db: Database, collection_name: str):
        super().__init__()
        self.db = db
        self.collection = self.db[collection_name]

    def emit(self, record):
        print("emit")
        log_entry = self.format(record)
        key = ['time', 'name', 'level', 'message']
        value = log_entry.split(' - ')
        self.collection.insert_one(dict(zip(key, value)))
