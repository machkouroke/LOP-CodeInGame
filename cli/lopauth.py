import argparse
from api.routes.route_users import login
import os
import uuid

def save_token_locally(token):
    file_name = f"token_{str(uuid.uuid4())}.txt"
    directory = "path/to/save/directory"
    file_path = os.path.join(directory, file_name)
    with open(file_path, "w") as file:
        file.write(token)
    return file_path


def lopauth(args):
    title = args.title
    name = args.name
    firstname = args.firstname
    password = args.password
    response = await login()
    if title == 'étudiant':
        success = response.get('success')
        message = response.get('message')
        auth_token = response.get('auth_token')
        save_token_locally(auth_token)

    elif title == 'professeur':
        success = response.get('success')
        message = response.get('message')
        auth_token = response.get('auth_token')
        save_token_locally(auth_token)

    else:
        print("Valeur invalide pour l'option --title. Veuillez spécifier 'étudiant' ou 'professeur'.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Commande lopauth')
    parser.add_argument('--title', choices=['étudiant', 'professeur'], required=True,
                        help='Spécifiez le titre (étudiant ou professeur)')
    parser.add_argument('--name', required=True, help='Spécifiez le nom')
    parser.add_argument('--firstname', required=True, help='Spécifiez le prénom')
    parser.add_argument('--password', required=True, help='Spécifiez le mot de passe')
    args = parser.parse_args()
    lopauth(args)
