import argparse

def lopauth(args):
    title = args.title
    name = args.name
    firstname = args.firstname
    password = args.password

    if title == 'étudiant':
        print(f"Authentification en tant qu'étudiant : {firstname} {name}")

    elif title == 'professeur':
        print(f"Authentification en tant que professeur : {firstname} {name}")

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
