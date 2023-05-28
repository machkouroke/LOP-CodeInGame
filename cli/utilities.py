import os
import zipfile
from pathlib import Path

import requests


def to_zip(path: Path, zip_path: Path):
    with zipfile.ZipFile(zip_path, "w") as zipf:
        for root, _, files in os.walk(path):
            if Path(root) == zip_path.parent:
                continue
            for file in files:
                zipf.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), path))


def send_file_to_api(file_path: Path, api_url: str):
    with open(file_path, "rb") as file:
        response = requests.post(api_url, files={"file": file})
    return response

def download_file_from_api(user_id: str, competition_id: str):
    kind = "template"
    url = f"http://localhost:8000/cli/lopdownload?user_id={user_id}&competition_id={competition_id}&kind={kind}"
    response = requests.get(url)
    return response.json()["download_link"]


def package_folder(user_id: str, competition_id: str, kind: str):
    temp_path = Path("temp")
    temp_path.mkdir(exist_ok=True)
    zip_path = temp_path / f"archive_{user_id}_{competition_id}.zip"
    to_zip(Path("."), zip_path)
    response = send_file_to_api(zip_path,
                                f"http://localhost:8000/cli/lopsubmit?user_id={user_id}"
                                f"&competition_id={competition_id}&kind={kind}")
    zip_path.unlink()
    temp_path.rmdir()


if __name__ == '__main__':
    user_id = "Machkour"
    competition_id = "2352"
    # package_folder(user_id="Machkour", competition_id="2352", kind="template")
    print(download_file_from_api(user_id=user_id, competition_id=competition_id))