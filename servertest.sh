docker build -t importser .
docker volume create data_volume
docker run --publish 3000:3000 importser
