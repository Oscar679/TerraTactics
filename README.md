# Installation Steps
Run these commands inside an empty folder.

```bash
git clone https://github.com/Oscar679/TerraTactics.git
cd TerraTactics
npm install
rune-tools compile
npm test
```

# Workflow

## Always Pull Latest Version

```bash
git checkout main
git pull origin main
```

## Work On Branches
Create a branch for each feature.

```bash
git checkout -b <feature-name>
```
Example:
```bash
git checkout -b healthbar
```

## Push A Branch To The Repository
```bash
git add .
git commit -m "Describe your change"
git push -u origin <feature-name>
```
Example:
```bash
git add .
git commit -m "Added healthbar to character"
git push -u origin healthbar
```


## Create A Pull Request

1. Push your branch to GitHub.
2. Open the repository on GitHub.
3. Click on `Pull Requests`.
![alt text](image-2.png)
4. Click `Compare & pull request`.
5. Add a title and description of your changes.
6. Create the pull request.
7. After review, merge the pull request into `main`.
