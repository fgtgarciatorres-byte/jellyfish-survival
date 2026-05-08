function createEntity(data){

    return {

        x:data.x || 0,
        y:data.y || 0,

        vx:data.vx || 0,
        vy:data.vy || 0,

        size:data.size || 10,

        type:data.type || 'entity',

        hp:data.hp || 1,

        active:true
    };
}
