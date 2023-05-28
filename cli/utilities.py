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

def package_folder():
    temp_path = Path("temp")
    temp_path.mkdir(exist_ok=True)
    zip_path = temp_path / "archive.zip"
    to_zip(Path("."), zip_path)
    response = send_file_to_api(temp_path / "archive.zip", "http://localhost:8000/cli/lopsubmit")
    print(response.text)
    zip_path.unlink()
    temp_path.rmdir()

if __name__ == '__main__':
    package_folder()
