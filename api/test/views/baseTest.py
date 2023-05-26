import os
import unittest

from api import create_app
from api.globals import bcrypt
from api.test.utilities.create import create_collections


class BaseTest(unittest.TestCase):
    def init(self, collection):
        self.collection = collection
        # self.INTELLIJ_PATH = ('..', '..', 'config', 'db_validator', self.VALIDATOR_JSON)
        self.app = create_app('testing')
        # self.INTELLIJ = self.app.config['INTELLIJ']
        self.client = self.app.test_client
        self.bcrypt = bcrypt
        try:
            self.db, self.client_db = self.create_test_data_base()
        except FileNotFoundError as e:
            self.fail(e)

    def tearDown(self) -> None:
        if not self.defaultTestResult().wasSuccessful():
            for log in self.db["logs"].find():
                self.client_db["LOPUrgence"]["tests_logs"].insert_one({"test_name": self.id(), **log})
        self.client_db.drop_database(self.app.config['MONGODB_SETTINGS']["db"])

    def create_test_data_base(self):
        # path = self.INTELLIJ_PATH
        # validator_path = os.path.join(*path)
        return create_collections([self.collection])
