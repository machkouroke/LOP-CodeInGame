import os
from datetime import timedelta
from io import BytesIO
from typing import Any
import tqdm
from google.cloud.storage import Bucket, Blob
from pymongo.database import Database
from fastapi import HTTPException, status


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


def handle_HTTP_Exception(func):
    async def wrapper(*args, **kwargs):
        try:
            print("test")
            return await func(*args, **kwargs)
        except HTTPException as e:
            raise e
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Une erreur du serveur est survenue: {e}",
            ) from e

    return wrapper


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
    async def upload(bucket: Bucket, file_path: str, dest_path: str, chunk_size: int = 256 * 1024) -> None:

        file_name = os.path.basename(file_path)

        file_size = os.path.getsize(file_path)
        chunks: list[Blob] = []
        chunk_index = 0
        with open(file_path, 'rb') as f:
            with tqdm.tqdm(total=file_size, unit='B', unit_scale=True, desc="Uploading") as pbar:
                while True:
                    chunk = f.read(chunk_size)
                    if not chunk:
                        break
                    chunk_name = f"{dest_path}{file_name}_chunk{chunk_index}"
                    chunk_blob = bucket.blob(chunk_name)
                    chunk_blob.upload_from_file(BytesIO(chunk), rewind=True, num_retries=3)
                    chunks.append(chunk_blob)
                    chunk_index += 1
                    pbar.update(len(chunk))
        final_blob = bucket.blob(f'{dest_path}{file_name}')
        final_blob.compose(chunks)
        for chunk in chunks:
            chunk.delete()
        os.remove(file_path)

        return None
