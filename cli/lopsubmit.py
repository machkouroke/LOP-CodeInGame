import os
import argparse as argparse
import requests
import yaml
import uuid

def send_files_to_server(config_file_path, main_file_path, test_file_path, server_url):
    files = {
        'config': open(config_file_path, 'rb'),
        'main': open(main_file_path, 'rb'),
        'test': open(test_file_path, 'rb')
    }

    response = requests.post(server_url, files=files)

    for file in files.values():
        file.close()
    return response.status_code

def generate_files(identifier,args):
    base_dir = os.getcwd()
    src_dir = os.path.join(base_dir, f'src')
    test_dir = os.path.join(base_dir, f'test')
    config_file = os.path.join(base_dir, f'config_{identifier}.yaml')
    os.makedirs(src_dir, exist_ok=True)
    os.makedirs(test_dir, exist_ok=True)
    with open(os.path.join(src_dir, 'main.py'), 'w') as file:
        file.write("# Code source")
    with open(os.path.join(test_dir, 'test_main.py'), 'w') as file:
        file.write("# Fichier de test")
    config_data = {'id': args.id, 'Test': 'python -m unittest discover test'}
    with open(config_file, 'w') as file:
        yaml.dump(config_data, file)
    return config_file, os.path.join(src_dir, 'main.py'), os.path.join(test_dir, 'test_main.py')


def lopsubmit(args):

    if args.kind == 'résolu':
        print(f"Soumission du fichier '{args.name}' comme exercice résolu...")
        chemin_fichier = args.file
        if os.path.exists(chemin_fichier):
            url_distant = 'http://lop.com/submit'
            with open(chemin_fichier, 'rb') as file:
                response = requests.post(url_distant, files={'file': file})
            if response.status_code == 200:
                identifier = str(uuid.uuid4())
                config_file_path, main_file_path, test_file_path = generate_files(identifier,args)
                send_files_to_server(config_file_path, main_file_path, test_file_path,"")
                print("Dossiers et fichiers générés avec succès.")
            else:
                print("Erreur lors de la soumission du fichier au serveur distant.")
        else:
            print("Le fichier spécifié n'existe pas.")
    elif args.kind == 'à_traiter':
        print(f"Soumission du fichier '{args.name}' comme exercice à traiter...")
        chemin_fichier = args.file
        if os.path.exists(chemin_fichier):
            url_distant = 'http://lop.com/submit'
            with open(chemin_fichier, 'rb') as file:
                response = requests.post(url_distant, files={'file': file})
            if response.status_code == 200:
                identifier = str(uuid.uuid4())
                config_file_path, main_file_path, test_file_path = generate_files(identifier,args)
                send_files_to_server(config_file_path, main_file_path, test_file_path, "")
                print("Dossiers et fichiers générés avec succès.")
            else:
                print("Erreur lors de la soumission du fichier au serveur distant.")
        else:
            print("Le fichier spécifié n'existe pas.")




if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Commande lopsubmit')
    parser.add_argument('--kind', choices=['résolu', 'à_traiter'], required=True,
                        help='Spécifiez le type (résolu ou à_traiter)')
    parser.add_argument('--name', required=True, help='Spécifiez le nom du fichier')
    parser.add_argument('--id', required=True, help='Id')
    parser.add_argument('--file', required=True, help='Spécifiez le chemin du fichier')
    args = parser.parse_args()
    lopsubmit(args)
