# Abdel — Portfolio UX/UI & design graphique

Portfolio statique compatible avec le dépôt GitHub Pages existant, y compris son sous-dossier `/abdellah-ait-mrim/`.

## Site

Ouvrir `index.html`, ou conserver le déploiement GitHub Pages actuel. Aucun framework, installation npm ou serveur applicatif n’est nécessaire.

- Logo texte : **Abdel**.
- Douze projets conservés ; quatre projets UX/UI mis en avant.
- Pages de projets partageables avec contexte, démarche, choix et livrables.
- Filtres accessibles, menu mobile, navigation au clavier et préférence de mouvement réduit.
- Les PDF originaux se chargent seulement après un clic sur leur lien.
- Police Manrope auto-hébergée ; licence dans `assets/fonts/OFL-Manrope.txt`.

## Modifier le contenu

Les coordonnées et les liens sont regroupés dans `site.json`. Les informations des études de cas sont dans `projects.json`.

Après une modification, reconstruire les pages avec Python et Pillow :

```bash
python scripts/build-pages.py
```

Les pages générées sont déjà présentes dans le dépôt : GitHub Pages n’a pas besoin d’exécuter ce script.

## Déploiement et reprise

Les fichiers du dossier `Nouveau dossier/` et les couvertures existantes sont conservés. Les anciens liens `#case-*` redirigent vers les nouvelles pages de projets.

L’adresse du bouton de contact d’origine est conservée dans `site.json`. Le bouton de copie utilise la même adresse, visible dans la page.
