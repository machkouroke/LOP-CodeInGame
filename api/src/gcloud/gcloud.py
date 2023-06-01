import firebase_admin
from firebase_admin import credentials, storage

import os

from google.cloud.storage import Bucket

from api.config.settings import get_settings

settings = get_settings()
CREDENTIALS_PATH = "credentials.json"
if not os.path.exists(CREDENTIALS_PATH):
    print(settings.GCLOUD_SERVICE_KEY_JSON, file=open(CREDENTIALS_PATH, mode="w"))
cred = credentials.Certificate(CREDENTIALS_PATH)
firebase_admin.initialize_app(cred, {'storageBucket': settings.GCLOUD_BUCKET})
def get_bucket() -> Bucket:
    return storage.bucket()
