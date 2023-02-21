echo '\n\n requesting all characters'

curl localhost:3000/characters

echo '\n\n requesting Tenma'

curl localhost:3000/characters/1

echo "\n\n requesting with invalid body"
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/characters

    
echo "\n\n creating Lain Iwakura"
CREATE=$(curl --silent -X POST \
    --data-binary '{"name": "Lain Iwakura", "age": "14", "series": "Serial Experiments Lain"}' \
    localhost:3000/characters)

echo $CREATE

ID=$(echo $CREATE | jq .id)
echo $ID

echo '\n\n requesting Lain'
curl localhost:3000/characters/$ID
