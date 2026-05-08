function checkCollision(a,b){

    let dx = a.x - b.x;
    let dy = a.y - b.y;

    let maxDist = a.size + b.size;

    if(Math.abs(dx) > maxDist) return false;
    if(Math.abs(dy) > maxDist) return false;

    return (
        dx*dx + dy*dy <
        maxDist*maxDist
    );
}
