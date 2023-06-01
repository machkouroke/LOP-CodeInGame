from datetime import timedelta
from typing import Any

from google.cloud.storage import Bucket
from pymongo.database import Database


def get_keys(dictionary: dict, keys: list) -> dict:
    keys += ["_id"]
    return {key: dictionary.get(key) for key in keys}





def field(name: str):
    """
    Decorator to add a dynamic field to a pydantic model
    :param name: Name of the field
    :return: Decorator
    """

    def decorator(func):
        @property
        def wrapper(self, *args, **kwargs):
            # Code avant l'appel de la méthode
            result = func(self, *args, **kwargs)
            self.__dict__[name] = result
            # Code après l'appel de la méthode
            return result

        return wrapper

    return decorator

def addToSet(database: Database, collection_name: str, query: dict, field: str, value: Any) -> None:
    database[collection_name].update_one(query, {"$addToSet": {field: value}})


class Firebase:
    @staticmethod
    def download_link(bucket: Bucket, path: str) -> str:

        return (
            bucket.get_blob(path).generate_signed_url(
                timedelta(seconds=36000), method='GET'
            )
        )
    @staticmethod
    def upload(bucket: Bucket, file_path: str, dest_path: str) -> None:
        blob = bucket.blob(f'{dest_path}{file_path}')
        blob.upload_from_filename(file_path)
        return None
