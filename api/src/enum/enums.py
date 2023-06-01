import enum


class ExerciseRelationKind(enum.Enum):
    SUBSCRIBER = "subscriber"
    CREATOR = "creator"


class ROLE(enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    USER = "user"