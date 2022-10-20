function init(){

    // Sumir com tela inicial e aparecer canvas
    document.getElementById("container-menu-iniciar").style.display = "none"
    document.getElementById("container-jogo").style.display = "flex"
    pPointsP1 = document.getElementById("player1-points")
    pPointsP2 = document.getElementById("player2-points")
    pTimer = document.getElementById("timer")
    imgAtaqueP1 = document.getElementById("player1-ataque")
    pCooldownP1 = document.getElementById("player1-ataque-cooldown")
    imgAtaqueP2 = document.getElementById("player2-ataque")
    pCooldownP2 = document.getElementById("player2-ataque-cooldown")
    var tocou_musica_final = false

    //==================================
    // Alteração Bento
    //====================================
    // START

    // trocar audio tela inicial para o da partida"
    audio = document.getElementById("game-sound");    
    audio.src = "./midia/music/play_game_sound2.mp3";
    audio.volume = 0.1;
    // END
    //==================================
    // Alteração Bento
    //====================================

    var ctx = document.getElementById("main-canvas").getContext("2d")
    var stage = new createjs.Stage("main-canvas");
    var teclas = {}

    var tempo = new Date().getTime() + (3 * 60 * 1000)
    var restante = tempo - new Date().getTime() 

    //==================================
    // Alteração Bento
    //====================================
    // START


    const colisao_arvore_map = [], escadas_map = [], ilha_principal_map = [], colisao_bordas_map = []

    for(let i = 0; i < colisao_arvore.length; i+=50){
        colisao_arvore_map.push(colisao_arvore.slice(i,50+i))
        escadas_map.push(escadas.slice(i,50+i))
        ilha_principal_map.push(ilha_principal.slice(i,50+i))
        colisao_bordas_map.push(colisao_bordas.slice(i,50+i))
        
    }

    class BoundaryColisaoArvore {
        static width = 12;
        static height = 12;
        constructor({position}) {
            this.position = position;
            this.width = 12;
            this.height = 12;         
                      
        }

        draw (){
            let rec_colisao_arvore = new createjs.Shape();
            rec_colisao_arvore.graphics.beginFill("blue");
            rec_colisao_arvore.graphics.drawRect(this.position.x,this.position.y,this.width,this.height)
            rec_colisao_arvore.graphics.endFill()
            stage.addChild(rec_colisao_arvore)
        }
        
    }

    const boundaries_colisao_arvore = []

    colisao_arvore_map.forEach((row, i)=> {
        row.forEach((symbol, j) => {
            if(symbol === 1026){
                boundaries_colisao_arvore.push(
                    new BoundaryColisaoArvore({
                        position:{
                            x: j * BoundaryColisaoArvore.width,
                            y: i* BoundaryColisaoArvore.height
                        }
                    })                 

                );
            }
            
        })
    })

    class BoundaryEscadas {
        static width = 12;
        static height = 12;
        constructor({position}) {
            this.position = position;
            this.width = 12;
            this.height = 12;         
                      
        }

        draw (){
            let rec_escadas = new createjs.Shape();
            rec_escadas.graphics.beginFill("purple");
            rec_escadas.graphics.drawRect(this.position.x,this.position.y,this.width,this.height)
            rec_escadas.graphics.endFill()
            stage.addChild(rec_escadas)
        }
        
    }

    const boundaries_escadas = []

    escadas_map.forEach((row, i)=> {
        row.forEach((symbol, j) => {
            if(symbol === 1027){
                boundaries_escadas.push(
                    new BoundaryEscadas({
                        position:{
                            x: j * BoundaryEscadas.width,
                            y: i* BoundaryEscadas.height
                        }
                    })                 

                );
            }
            
        })
    })

    class BoundaryIlhaPrincipal {
        static width = 12;
        static height = 12;
        constructor({position}) {
            this.position = position;
            this.width = 12;
            this.height = 12;         
                      
        }

        draw (){
            let rec_ilha_principal = new createjs.Shape();
            rec_ilha_principal.graphics.beginFill("yellow");
            rec_ilha_principal.graphics.drawRect(this.position.x,this.position.y,this.width,this.height)
            rec_ilha_principal.graphics.endFill()
            stage.addChild(rec_ilha_principal)
        }
        
    }

    const boundaries_ilha_principal_on_water = []    

    ilha_principal_map.forEach((row, i)=> {
        row.forEach((symbol, j) => {
            if(symbol === 0){
                boundaries_ilha_principal_on_water.push(
                    new BoundaryIlhaPrincipal({
                        position:{
                            x: j * BoundaryIlhaPrincipal.width,
                            y: i* BoundaryIlhaPrincipal.height
                        }
                    })                 

                );
            }  
        })
    })

    class BoundaryColisaoBordas {
        static width = 12;
        static height = 12;
        constructor({position}) {
            this.position = position;
            this.width = 12;
            this.height = 12;         
                      
        }

        draw (){
            let rec_colisao_bordas = new createjs.Shape();
            rec_colisao_bordas.graphics.beginFill("green");
            rec_colisao_bordas.graphics.drawRect(this.position.x,this.position.y,this.width,this.height)
            rec_colisao_bordas.graphics.endFill()
            stage.addChild(rec_colisao_bordas)
        }
        
    }

    const boundaries_colisao_bordas = []

    colisao_bordas_map.forEach((row, i)=> {
        row.forEach((symbol, j) => {
            if(symbol === 1025){
                boundaries_colisao_bordas.push(
                    new BoundaryColisaoBordas({
                        position:{
                            x: j * BoundaryColisaoBordas.width,
                            y: i* BoundaryColisaoBordas.height
                        }
                    })                 

                );
            }
            
        })
    })

    // END
    //==================================
    // Alteração Bento
    //====================================

    //==================================
    // Alteração Bento
    //====================================
    // START

    //criando audios de efeito do jogo
    var audio_assets_path = "../midia/effects/";
    var splashing_water_play = false;
    var catch_apple = false;
    var punch = false
    
     
    var sounds = [
        {src:"splashing_water.mp3", id:"splashing_water", loop: -1},
        {src:"catch_apple.mp3", id:"catch_apple"},
        {src:"punch.mp3", id:"punch"},
        {src:"finish_game.mp3", id:"finish_game"},
    ]

    createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
	createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
	createjs.Sound.registerSounds(sounds, audio_assets_path);

    function soundLoaded(event) {
        //examples.hideDistractor();
        console.log("audios carregados!")
    }

    function stopSound(target) {
        
        createjs.Sound.stop(target);
    }
    
    function playSound(target) {
        //Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
        var instance = createjs.Sound.play(target);
        if(target ==="finish_game"){
            instance.volume = 0.1;
        }
        if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
            return;
        }
        target.className = "gridBox active";
        instance.addEventListener("complete", function (instance) {
            target.className = "gridBox";
        });
    }

    function finishGameSound(){
        audio.pause();
        audio.currentTime = 0;
        
        playSound("finish_game");

    }

    function restartGameSound(){
        stopSound(("finish_game"))
        audio.play();
    }

    // END
    //==================================
    // Alteração Bento
    //====================================

    var img_mapa  = new Image()
    img_mapa.src = "img/mapa_completo.png"

    imagens_cap = {
        "up":{
            //"cap":          "img/capivara/andando/normal/capivara_andando_cima.png",
            "cap":          "img/capivara/static/normal/capivara_up.png",
            "capMaca":      "img/capivara/static/maca/capivara_up maca.png",
            "capAgua":      "img/capivara/static/agua/capivara_up agua.png",
            "capMacaAgua":  "img/capivara/static/agua_maca/capivara_up agua maca.png",
        },
        "down":{
            "cap":          "img/capivara/static/normal/capivara_down.png",
            "capMaca":      "img/capivara/static/maca/capivara_down maca.png",
            "capAgua":      "img/capivara/static/agua/capivara_down agua.png",
            "capMacaAgua":  "img/capivara/static/agua_maca/capivara_down agua maca.png",
        },
        "left":{
            "cap":          "img/capivara/static/normal/capivara_left.png",
            "capMaca":      "img/capivara/static/maca/capivara_left maca.png",
            "capAgua":      "img/capivara/static/agua/capivara_left agua.png",
            "capMacaAgua":  "img/capivara/static/agua_maca/capivara_left agua maca.png",
        },
        "right":{
            "cap":          "img/capivara/static/normal/capivara_right.png",
            "capMaca":      "img/capivara/static/maca/capivara_right maca.png",
            "capAgua":      "img/capivara/static/agua/capivara_right agua.png",
            "capMacaAgua":  "img/capivara/static/agua_maca/capivara_right agua maca.png",
        }
    }

    posicoes_maca = [
        {x: 557, y: 55},
        {x: 460, y: 300},
        {x: 360, y: 190},
        {x: 35, y: 240},
        {x: 35, y: 370},
        {x: 45, y: 550},
    ]

    class Maca{
        constructor(x,y){
            this.shape = new createjs.Bitmap("img/maca.png")
            this.shape.x = x
            this.shape.y = y
            stage.addChild(this.shape)
        }

    }

    class Mapa {
        constructor() {
            this.shape = new createjs.Bitmap()
            this.shape.image = img_mapa
            stage.addChild(this.shape);
            this.apples = []
            this.summon_apple()
            this.summon_apple()

        }

        summon_apple(){


            var pos = {}

            var resortear = true// só para entrar no loop

            while(resortear){
                var resortear = false
                pos = posicoes_maca[Math.floor(Math.random()*posicoes_maca.length)];
                for(var i = 0; i < this.apples.length; i++){ 
                    if(this.apples[i].shape.x == pos.x && this.apples[i].shape.y == pos.y){
                        resortear = true 
                        break
                    }
                }
            }          

            this.apples.push(new Maca(pos.x, pos.y))
        }
    }

    class Capivara {
        constructor(x, y, name, filter = false) {

            this.name = name
            this.shape = new createjs.Bitmap()
            this.shape.image = new Image()
            this.shape.scaleX = 1.2
            this.shape.scaleY = 1.2
            this.isInWater = false
            this.isHoldingApple = false
            this.grab_distance = 30
            this.apple = {}
            this.apple 
            this.current_face = "right"
            this.update_image(this.current_face)
            this.points = 0

            this.filter = filter
            this.cached = false

            this.shape.x = x;
            this.shape.y = y;
            stage.addChild(this.shape);
            
            this.speed = {"x": 0, "y": 0}
            this.speed_max = 2.4
            this.water_factor = 0.65
            this.apple_factor = 0.8
            this.accelerate_strength = 0.1
            this.brake_strength = 0.2
            this.kick_strength = 7
            this.kick_last_time = 0
            this.kick_distance = 50
            this.kick_cooldown = 10
        }

        accelerate(x, y){

            if(x > 0){
                if(this.speed.x < this.speed_max){
                    this.speed.x += x * (this.brake_strength + this.accelerate_strength)
                }
            }else{
                if(this.speed.x > -this.speed_max){
                    this.speed.x += x * (this.brake_strength + this.accelerate_strength)
                }
            }

            if(y > 0){
                if(this.speed.y < this.speed_max){
                    this.speed.y += y * (this.brake_strength + this.accelerate_strength)
                }
            }else{
                if(this.speed.y > -this.speed_max){
                    this.speed.y += y * (this.brake_strength + this.accelerate_strength)
                }
            }
        }

        brake(){
            if(this.speed.x != 0){
                if(this.speed.x > 0){
                    this.speed.x -= this.brake_strength 
                    if(this.speed.x < 0) this.speed.x = 0
                }else{
                    this.speed.x += this.brake_strength 
                    if(this.speed.x > 0) this.speed.x = 0
                }
            }
            if(this.speed.y != 0){
                if(this.speed.y > 0){
                    this.speed.y -= this.brake_strength
                    if(this.speed.y < 0) this.speed.y = 0
                }else{
                    this.speed.y += this.brake_strength 
                    if(this.speed.y > 0) this.speed.y = 0
                }
            }
        }

        kick(other){

            

            var dist = Math.sqrt(Math.pow(this.shape.x - other.shape.x,2)+Math.pow(this.shape.y - other.shape.y,2))
            var angle = Math.atan2(other.shape.y - this.shape.y, other.shape.x - this.shape.x) // radians
            
            if(this.kick_last_time + this.kick_cooldown * 1000 < new Date().getTime()){

                this.kick_last_time = new Date().getTime()

                if(dist < this.kick_distance){

                    other.drop_apple()
                    //==================================
                    // Alteração Bento
                    //====================================
                    // START
                    if(!punch){
                        setTimeout(() =>{
                            stopSound("punch")
                            if(splashing_water_play){                        
                                playSound("splashing_water");
                            }
                            punch = false;
                        }, 1000)
                        playSound("punch");
                        punch = true;
                    }
                    // END
                    //==================================
                    // Alteração Bento
                    //====================================

                    other.speed.x = 0
                    other.speed.y = 0

                    other.speed.x = this.kick_strength * Math.cos(angle)
                    other.speed.y = this.kick_strength * Math.sin(angle)
                }
            }
        }

        check_kick_cooldown(){
            return (new Date().getTime() - this.kick_last_time - this.kick_cooldown * 1000) /1000
        }

        collide(other){

            var dist = Math.sqrt(Math.pow(this.shape.x - other.shape.x,2)+Math.pow(this.shape.y - other.shape.y,2))

            if (dist <= 15){
                var aux = this.speed.x + Math.sign(this.speed.x) * 0.5
                this.speed.x = other.speed.x + Math.sign(other.speed.x) * 0.5
                other.speed.x = aux

                aux = this.speed.y + Math.sign(this.speed.y) * 1
                this.speed.y = other.speed.y + Math.sign(other.speed.y) * 0.5
                other.speed.y = aux
            }
        }

        grab_apple(){
            //if already have apple, skip

            if(this.isHoldingApple){
                return
            }

            

            var closest_apple = {}
            var closest_apple_index = 0
            var closest_dist = 600
            mapa.apples.forEach((e, i) => {
                var dist = Math.sqrt(Math.pow(this.shape.x - e.shape.x,2)+Math.pow(this.shape.y - e.shape.y,2))
                if (dist < closest_dist){
                    closest_dist = dist
                    closest_apple = e
                    closest_apple_index = i
                }
            });

            if(Object.keys(closest_apple).length > 0){
                if(closest_dist <= this.grab_distance){
                    this.isHoldingApple = true
                    this.speed_max           *= this.apple_factor
                    this.accelerate_strength *= this.apple_factor
                    this.brake_strength      *= this.apple_factor
                    this.apple = closest_apple
                    closest_apple.shape.visible = false
                    mapa.apples.splice(closest_apple_index,1);
                    this.update_image(this.current_face)
                    //==================================
                    // Alteração Bento
                    //====================================
                    // START

                    if(!catch_apple){
                        setTimeout(() =>{
                            stopSound("catch_apple")
                            if(splashing_water_play){                        
                                playSound("splashing_water");
                            }
                            catch_apple = false;
                        }, 1000)
                        playSound("catch_apple");
                        catch_apple = true;
                    } 

                    // END
                    //==================================
                    // Alteração Bento
                    //====================================
                }
            }
        }

        drop_apple(){
            if(this.isHoldingApple){
                mapa.apples.push(this.apple)
                this.apple.shape.visible = true
                this.apple = {}
                this.isHoldingApple = false
                this.speed_max           *= 1/this.apple_factor
                this.accelerate_strength *= 1/this.apple_factor
                this.brake_strength      *= 1/this.apple_factor
            }
        }

        check_delivery(paragrafo){
            if(this.isHoldingApple){
                this.apple.shape.x = this.shape.x
                this.apple.shape.y = this.shape.y
                var dist = Math.sqrt(Math.pow(this.shape.x - rei.shape.x,2)+Math.pow(this.shape.y - rei.shape.y,2))
                if (dist < 40){
                    this.deliver(paragrafo)
                }
            }
        }

        deliver(paragrafo = ""){
            stage.removeChild(this.apple.shape)
            this.apple = {}
            this.isHoldingApple = false
            this.speed_max           *= 1/this.apple_factor
            this.accelerate_strength *= 1/this.apple_factor
            this.brake_strength      *= 1/this.apple_factor
            this.points += 1
            if(paragrafo){
                paragrafo.innerHTML= "Pontos: " + this.points
            }
            mapa.summon_apple()
        }

        //==================================
        // Alteração Bento
        //====================================
        // START

        tree_colision(contact_zone){       
            contact_zone.forEach((boundary) => {                
                //boundary.draw()

                if(this.shape.x +  this.speed.x >= boundary.position.x &&
                this.shape.x + this.speed.x <= boundary.position.x + boundary.width &&
                this.shape.y + this.speed.y <= boundary.position.y + boundary.height &&
                this.shape.y + this.speed.y >= boundary.position.y){
                    this.speed.x *= -1
                    this.speed.y *= -1 
                }
                 
             })
 
         }
 
         on_stairs(contact_zone){
             contact_zone.forEach((boundary) => {  
                 //boundary.draw()              
                 if(this.shape.x + this.speed.x >= boundary.position.x &&
                 this.shape.x + this.speed.x <= boundary.position.x + boundary.width &&
                 this.shape.y + this.speed.y <= boundary.position.y + boundary.height &&
                 this.shape.y + this.speed.y >= boundary.position.y){
                     //console.log("na escada")
                     if(this.isInWater){
                        this.isInWater = false
                        this.speed_max *= 1/this.water_factor
                        this.brake_strength *= 1/this.water_factor
                        this.accelerate_strength *= 1/this.water_factor
                     }

                    //==================================
                    // Alteração Bento
                    //====================================
                    // START
                    if(splashing_water_play){
                        splashing_water_play = false;
                        stopSound("splashing_water")
                    }                    
                    //END
                    //==================================
                    // Alteração Bento
                    //====================================  
                     
                 }
             })
             this.update_image(this.current_face)
         }
 
         on_water(contact_zone){
             contact_zone.forEach((boundary) => {  
                 //boundary.draw()              
                 if(this.shape.x + this.speed.x >= boundary.position.x &&
                 this.shape.x + this.speed.x <= boundary.position.x + boundary.width &&
                 this.shape.y + this.speed.y <= boundary.position.y + boundary.height &&
                 this.shape.y + this.speed.y >= boundary.position.y){
                     //console.log("na agua")
                     if(!this.isInWater){
                        this.isInWater = true
                        this.speed_max *= this.water_factor
                        this.brake_strength *= this.water_factor
                        this.accelerate_strength *= this.water_factor
                     }

                     //==================================
                     // Alteração Bento
                     //====================================
                     // START
                     if(!splashing_water_play){
                        splashing_water_play = true;
                        playSound("splashing_water");
                     }
                     // END
                     //==================================
                     // Alteração Bento
                     //====================================
                     
                 }
             })
             this.update_image(this.current_face)
         }
 
         on_earth(contact_zone){
             contact_zone.forEach((boundary) => {  
                 //boundary.draw()              
                 if(this.shape.x + this.speed.x >= boundary.position.x &&
                 this.shape.x + this.speed.x <= boundary.position.x + boundary.width &&
                 this.shape.y + this.speed.y <= boundary.position.y + boundary.height &&
                 this.shape.y + this.speed.y >= boundary.position.y){
                    if(this.isInWater){
                        this.speed.x *= -1
                        this.speed.y *= -1
                    }else{
                        //console.log("na terra")
                        this.isInWater = false // só garantia, já passou pela ponte
                        
                    }
                     
                 }
             })
             this.update_image(this.current_face)
         }
 
         // END
         //==================================
         // Alteração Bento
         //====================================

        update_pos(){
            
            if(this.shape.x < 0){
                this.speed.x = + Math.abs(this.speed.x)
            } if (this.shape.x > stage.canvas.width){
                this.speed.x = - Math.abs(this.speed.x)
            }

            if(this.shape.y < 0){
                this.speed.y = + Math.abs(this.speed.y)
            } if (this.shape.y > stage.canvas.height){
                this.speed.y = - Math.abs(this.speed.y)
            }
                 
            this.shape.x += this.speed.x
            this.shape.y += this.speed.y

            if(this.isHoldingApple){
                this.apple.shape.x = this.shape.x
                this.apple.shape.y = this.shape.y
            }
                
        }

        update_image(direction){
            
            var auxImg = new Image()

            this.current_face = direction

            if (this.isInWater){
                if(this.isHoldingApple){
                    auxImg.src = imagens_cap[direction]["capMacaAgua"]
                }else{
                    auxImg.src = imagens_cap[direction]["capAgua"]
                }
            }else{
                if(this.isHoldingApple){
                    auxImg.src = imagens_cap[direction]["capMaca"]
                }else{
                    auxImg.src = imagens_cap[direction]["cap"]
                }
            }

            auxImg.onload = ()=>{
                if(this.cached){
                    this.shape.uncache()
                }

                this.shape.image = auxImg

                this.shape.regX = this.shape.getBounds().width /2
                this.shape.regY = this.shape.getBounds().height /2

                if(this.filter){
                    this.shape.filters = [new createjs.ColorFilter(1.0, 1.0, 1.0, 1, 0, -50, -30)]
                    this.shape.filters = [new createjs.ColorFilter(0.85, 1.0, 1.0, 1, 0, -50, -30)]
                    //this.shape.filters = [new createjs.ColorFilter(0.85, 1.0, 0.0, 1, +100, +110, 0)]
                }
                this.shape.cache(this.shape.getBounds().x, this.shape.getBounds().y, this.shape.getBounds().width, this.shape.getBounds().height)
                this.cached = true

            }
        }
    }

    class Rei{
        constructor(x,y){
            var image = new Image()
            image.src = "img/capivara rei.png"
            image.onload = () =>{
                this.shape = new createjs.Bitmap()
                this.shape.image = image
                this.shape.x = x
                this.shape.y = y
                this.shape.scaleX = 1.8
                this.shape.scaleY = 1.8
                this.shape.regX = this.shape.getBounds().width /2
                this.shape.regY = this.shape.getBounds().height /2

                stage.addChild(this.shape)
            }
            
        }
    }
    
    mapa = new Mapa()
    
    
    rei = new Rei(285, 285)
    capivara1 = new Capivara(400,200, "Jogador 1")
    capivara2 = new Capivara(400,350, "Jogador 2", true)

    createjs.Ticker.framerate = 60
    createjs.Ticker.on("tick", ()=>{

        capivara1.collide(capivara2)
        capivara1.tree_colision(boundaries_colisao_arvore) 
        capivara1.on_stairs(boundaries_escadas)
        capivara1.on_earth(boundaries_colisao_bordas)
        capivara1.on_water(boundaries_ilha_principal_on_water)
        capivara1.update_pos()
        capivara1.brake()
        capivara1.check_delivery(pPointsP1)
          

        if ("W" in teclas || "w" in teclas){
            capivara1.accelerate(0,-1)
            capivara1.update_image("up")
        }
        if ("A" in teclas || "a" in teclas){
            capivara1.accelerate(-1,0)
            capivara1.update_image("left")
        }
        if ("S" in teclas || "s" in teclas){
            capivara1.accelerate(0,1)
            capivara1.update_image("down")
        }
        if ("D" in teclas || "d" in teclas){
            capivara1.accelerate(1,0)
            capivara1.update_image("right")
        }
        if ("E" in teclas || "e" in teclas){
            capivara1.grab_apple()
        }
        if ("F" in teclas || "f" in teclas){
            capivara1.kick(capivara2)
        }     

        capivara2.tree_colision(boundaries_colisao_arvore) 
        capivara2.on_stairs(boundaries_escadas)
        capivara2.on_earth(boundaries_colisao_bordas)
        capivara2.on_water(boundaries_ilha_principal_on_water)
        capivara2.update_pos()
        capivara2.brake()
        capivara2.check_delivery(pPointsP2)

        if ("ArrowUp" in teclas){
            capivara2.accelerate(0,-1)
            capivara2.update_image("up")
        }
        if ("ArrowLeft" in teclas){
            capivara2.accelerate(-1,0)
            capivara2.update_image("left")
        }
        if ("ArrowDown" in teclas){
            capivara2.accelerate(0,1)
            capivara2.update_image("down")
        }
        if ("ArrowRight" in teclas){
            capivara2.accelerate(1,0)
            capivara2.update_image("right")
        }
        if ("Enter" in teclas){
            capivara2.grab_apple()
        }
        if ("/" in teclas || "n" in teclas || "N" in teclas){
            capivara2.kick(capivara1)
        }


        var restante = tempo - new Date().getTime()
        min = Math.floor(restante/60/1000)
        sec = Math.floor(restante/1000 - min*60)

        if (restante > 0) {

            pTimer.innerHTML = min +":"+sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            ctx.imageSmoothingEnabled= false
            stage.update()

            var cap1_cooldown = capivara1.check_kick_cooldown()
            var cap2_cooldown = capivara2.check_kick_cooldown()

            if (cap1_cooldown > 0){
                imgAtaqueP1.classList.remove('deactive')
                pCooldownP1.innerHTML = ""
            }else{
                imgAtaqueP1.classList.add('deactive')
                pCooldownP1.innerHTML = Math.floor(Math.abs(cap1_cooldown)) + "s"
            }

            if (cap2_cooldown > 0){
                imgAtaqueP2.classList.remove('deactive')
                pCooldownP2.innerHTML = ""
            }else{
                imgAtaqueP2.classList.add('deactive')
                pCooldownP2.innerHTML = Math.floor(Math.abs(cap2_cooldown)) + "s"
            }

        }else{
            pTimer.innerHTML = "0:00"
            if(!tocou_musica_final){
                finishGameSound()
                tocou_musica_final = true
            }
            
            pFim = document.getElementById("pFim")
            pFim.style.display = "block"

            if (capivara1.points > capivara2.points) {
                pFim.innerHTML = "<span class='fim'>FIM DE JOGO!</span><br><br><span class='fimsub'>O Jogador 1 venceu! <br><br>Aperte F5</span></p>"
            }else if (capivara2.points > capivara1.points) {
                pFim.innerHTML = "<span class='fim'>FIM DE JOGO!</span><br><br><span class='fimsub'>O Jogador 2 venceu! <br><br>Aperte F5</span></p>"
            }else{
                pFim.innerHTML = "<span class='fim'>FIM DE JOGO!</span><br><br><span class='fimsub'>Empate!</span></p>"
            }
        }

        
    })
    
    window.addEventListener("keydown", (e) =>{       
        teclas[e.key] = true
    })

    window.addEventListener("keyup", (e) =>{
        delete teclas[e.key]
    })
}
