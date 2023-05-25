from faker import Faker

from api.src.models.User import User, Student, Teacher


class UserGenerator:
    def __init__(self, database=None):
        self.generator = Faker()
        self.user = None
        self.database = database

    def user_lambda(self):
        self.user = User(name=self.generator.first_name(), surname=self.generator.last_name(),
                         mail=self.generator.email(), password=self.generator.password())
        return self.user

    def student(self):
        user_: User = self.user_lambda()
        self.user= Student(**user_.to_json(to_exclude={"Type"}),
                           level= 2)
        return self.user

    def teacher(self):
        user_: User = self.user_lambda()
        self.user = Teacher(**user_.to_json(to_exclude={"Type"}),
                            module= 'Apprentissage Automatique')
        return self.user

    def generate(self, user_lambda=20, students=10, teachers=5):
        user_lambda = [self.user_lambda() for _ in range(user_lambda)]
        students = [self.student() for _ in range(students)]
        teachers = [self.teacher() for _ in range(teachers)]
        return user_lambda+ students+ teachers
