import argparse
import os
import requests

def lopdownload(args):
    if args.kind == 'étudiant':
        print(f"Téléchargement du fichier '{args.name}' en tant qu'étudiant...")
        repertoire_local = args.directory
        chemin_fichier = os.path.join(repertoire_local, args.name)
        if os.path.exists(chemin_fichier):
            #url distant du serveur à compléter
            url_distant ='http://localhost:8080/upload'
            with open(chemin_fichier, 'rb') as file:
                response = requests.post(url_distant, files={'file': file})
            if response.status_code == 200:
                print(f"Le fichier '{args.name}' a été téléchargé avec succès en tant qu'étudiant.")
            else:
                print("Erreur lors de l'envoi du fichier au serveur distant.")
        else:
            print("Le fichier spécifié n'existe pas.")
    elif args.kind == 'professeur':
        print(f"Téléchargement du fichier '{args.name}' en tant que professeur...")
        repertoire_local = args.directory
        chemin_fichier = os.path.join(repertoire_local, args.name)
        if os.path.exists(chemin_fichier):
            # url distant du serveur à compléter
            url_distant = 'http://localhost:8080/upload'
            with open(chemin_fichier, 'rb') as file:
                response = requests.post(url_distant, files={'file': file})
                print("bye")
            if response.status_code == 200:
                print(f"Le fichier '{args.name}' a été téléchargé avec succès en tant qu'étudiant.")
            else:
                print("Erreur lors de l'envoi du fichier au serveur distant.")
        else:
            print("Le fichier spécifié n'existe pas.")
    else:
        print("Valeur invalide pour l'option --kind. Veuillez spécifier 'étudiant' ou 'professeur'.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Commande lopdownload')
    parser.add_argument('--kind', choices=['étudiant', 'professeur'], required=True,
                        help='Spécifiez le type (étudiant ou professeur)')
    parser.add_argument('--name', required=True, help='Spécifiez le nom du fichier')
    parser.add_argument('--directory', default=os.getcwd(), help='Spécifiez le répertoire local (par défaut: répertoire courant)')
    args = parser.parse_args()
    lopdownload(args)
