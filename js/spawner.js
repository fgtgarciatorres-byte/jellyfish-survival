let spawnTimer = 0;

function updateSpawner(){

    spawnTimer -= gameState.delta;

    if(spawnTimer <= 0){

        spawnEnemy();

        spawnTimer =
        60 - gameState.level*2;
    }
}
