cd c4frontend

rm -rf build

# 1. Build the frontend
yarn build

# 2. Move files at the build root inside a root subdirectory
mkdir -p build/root
for file in $(ls build | grep -E -v '^(index\.html|static|root)$'); do
    mv "build/$file" build/root;
done

cd ..

# pipenv shell

# 3. Build the backend
pipenv run python manage.py collectstatic --no-input

cd ..

read -n 1 -s -r -p "Press any key to continue"