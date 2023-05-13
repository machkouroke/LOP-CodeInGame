import argparse
import os
import requests

def lopsubmit(args):
    #avec 3 options --file --kind et --name à préciser
    if args.kind == 'solved':
        print(f"Soumission du fichier '{args.name}' comme exercice résolu...")
        # Logique spécifique pour les exercices résolus
        chemin_fichier = args.file
        if os.path.exists(chemin_fichier):
            # Envoyer le fichier au serveur distant url à spécifier
            url_distant = 'http://lop.com/submit'
            with open(chemin_fichier, 'rb') as file:
                response = requests.post(url_distant, files={'file': file})
            if response.status_code == 200:
                print(f"Le fichier '{args.name}' a été soumis avec succès comme exercice résolu.")
            else:
                print("Erreur lors de la soumission du fichier au serveur distant.")
        else:
            print("Le fichier spécifié n'existe pas.")
    elif args.kind == 'to solve':
        print(f"Soumission du fichier '{args.name}' comme exercice à traiter...")
        chemin_fichier = args.file
        if os.path.exists(chemin_fichier):
            # Envoyer le fichier au serveur distant
            url_distant = 'http://lop.com/submit'
            with open(chemin_fichier, 'rb') as file:
                response = requests.post(url_distant, files={'file': file})
            if response.status_code == 200:
                print(f"Le fichier '{args.name}' a été soumis avec succès comme exercice à traiter.")
            else:
                print("Erreur lors de la soumission du fichier au serveur distant.")
        else:
            print("Le fichier spécifié n'existe pas.")
    else:
        print("Valeur invalide pour l'option --kind. Veuillez spécifier 'solved' ou 'to solve'.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Commande lopsubmit')
    parser.add_argument('--kind', choices=['solved', 'to solve'], required=True,
                        help='Please specify the type (solved or to solve)')
    parser.add_argument('--name', required=True, help='Spécifiez le nom du fichier')
    parser.add_argument('--file', required=True, help='Spécifiez le chemin du fichier')
    args = parser.parse_args()
    lopsubmit(args)
