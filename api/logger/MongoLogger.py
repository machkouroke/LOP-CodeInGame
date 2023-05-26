import logging

from flask_pymongo.wrappers import Database

from api.logger.MongoHandler import MongoHandler


class MongoLogger(logging.Logger):
    def __init__(self, name: str = '', db: Database = None, collection_name: str = None):
        super().__init__(name)
        if name:
            self.db = db
            self.setLevel(logging.ERROR)
            self.mongo_handler = MongoHandler(self.db, collection_name)
            self.addHandler(self.mongo_handler)
            self.formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
            self.mongo_handler.setFormatter(self.formatter)
