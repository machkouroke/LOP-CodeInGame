import unittest

from api.config.routes import USER_ROUTE
from api.src.authentication.jwt_encode import decode_auth_token
from api.src.models.objectid import PydanticObjectId
from api.test.utilities.generator.UserGenerator import UserGenerator
from api.test.views.baseTest import BaseTest


class TestUser(BaseTest):

    def setUp(self):
        self.init(collection='User')
        self.generator = UserGenerator()
        if self._testMethodName != 'test_create_user':
            self.generate_data()

    def generate_data(self):
        data = self.generator.generate(user_lambda=3, students=3, teachers=3)
        for user in data:
            user.set_db(self.db)
            user.save(crypt=self.bcrypt)


class TestEndpoints(TestUser):
    def test_create_user(self):
        for user in self.generator.generate(user_lambda=1, students=1, teachers=0):
            res = self.client().post(f'{USER_ROUTE}', query_string={"type": user.Type},
                                     json=user.to_json(to_exclude={"Type", "id"}))
            data = res.get_json()
            self.assertEqual(res.status_code, 200)
            self.assertEqual(data['success'], True)
            self.assertTrue(self.db.Users.find_one({"_id": PydanticObjectId(data['data']['user_id'])}))
            self.assertEqual(str(decode_auth_token(data['data']['auth_token'])),
                             data['data']['user_id'])
