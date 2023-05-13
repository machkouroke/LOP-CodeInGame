import argparse
import requests
def lopauth(args):
    name = args.name
    firstname = args.firstname
    password = args.password

    #url du serveur à saisir
    url_distant = ''
    payload = {'name': name, 'firstname': firstname, 'password': password}
    response = requests.post(url_distant, data=payload)

    if response.status_code == 200:
        print("Connecté")
    else:
        print("Erreur lors de l'authentification")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Commande lopauth')
    parser.add_argument('--name', required=True, help='Spécifiez le nom')
    parser.add_argument('--firstname', required=True, help='Spécifiez le prénom')
    parser.add_argument('--password', required=True, help='Spécifiez le mot de passe')
    args = parser.parse_args()
    lopauth(args)
