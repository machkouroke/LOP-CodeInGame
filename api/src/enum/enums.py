import enum


class ExerciseRelationKind(enum.Enum):
    SUBSCRIBER = "subscriber"
    CREATOR = "creator"


class ROLE(enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    USER = "user"


class ExerciseKind(enum.Enum):
    PRIVATE_ROOM = "Salon privé"
    TRAINING = "Exercice d'entrainement"
    COMPETITION = "Compétition"

class ProgramingLanguage(enum.Enum):
    PYTHON = "Python"