/*globals THREE */
(() => {
    var dom = document.querySelector('canvas'),
    width = dom.getAttribute('width'),
    height = dom.getAttribute('height'),
    mp = Math.PI,
    x = $('.x')[0].value,
    y = $('.y')[0].value,
    z = $('.z')[0].value,
    reqRet;

    (function(w,r){
        w['r'+r] = w['r'+r] ||
        w['webkitR'+r] ||
        w['mozR'+r] ||
        w['oR'+r] ||
        w['msR'+r] ||
        function(callback){w.setTimeout(callback,1000/60);};
    })(window,'equestAnimationFrame');

    var renderer = new THREE.WebGLRenderer({
        canvas:dom
    });

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(50,width / height,1,10000);
    camera.position.set(x, y, z);

    var geometry = new THREE.BoxGeometry(200,200,200);

    var material = new THREE.MeshStandardMaterial({color:0x0000FF});

    var box = new THREE.Mesh(geometry,material);
    scene.add(box);

    var light = new THREE.DirectionalLight(0xffffff);
    light.intensity = 2;

    scene.add(light);

    light.position.set(1,1,1);

    renderer.render(scene,camera);

    var load = function(){
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
        x = $('.x')[0].value,
        y = $('.y')[0].value,
        z = $('.z')[0].value;
        camera.position.set(x, y, z);

        renderer.render(scene,camera);

        requestAnimationFrame(load);
    };

    $('span span').on('click',function(){
        var target = $(this).parent().find('input')[0];
        if($(this).hasClass('up')){
            target.value = (target.value | 0) + 10;
        }else{
            target.value = (target.value | 0) - 10;
        }
    });

    load();
})();
