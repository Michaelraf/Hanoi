container = document.querySelector(".container");

class Disc {
    constructor(len, posX, posY) {
        this.len = len;
        this.elt = document.createElement('div');
        this.elt.classList.add("disc");
        this.elt.style.width = 50 + 18 * this.len + 'px';
        let color1 = /* Math.floor(Math.random()*255); */ 79;
        let color2 = /* Math.floor(Math.random()*255); */ 155;
        let color3 = /* Math.floor(Math.random()*255); */ 191;
        this.elt.style.background = "rgb(" + color1 + "," + color2 + "," + color3 + ")" /* "linear-gradient(180deg, rgba("+ color1 +"," + color2 + "," + color3 + ",1) 0%, rgb(204, 202, 202) 50%, rgba("+ color1 +"," + color2 + "," + color3 + ",1) 100%)"; */;
        this.posX = posX;
        this.posY = posY;
    }
    get getElt() {
        return this.elt;
    }
    set setPosX(posX) {
        this.posX = posX;
    }
    set setPosY(posY) {
        this.posY = posY;
    }
    put() {
        // Setting the position
        let width = this.elt.style.width.split('px')[0];
        this.elt.style.top = this.posX + "px";
        this.elt.style.left = this.posY + "px";
        container.appendChild(this.elt);
    }
    updatePos() {
        this.elt.style.top = this.posX + "px";
        this.elt.style.left = this.posY + "px";
    }
    activate() {
        this.elt.addEventListener('click', (e) => {
            this.posX = container.offsetTop;
            this.updatePos();
            this.elt.classList.add("active");
        });
    }
    deactivate() {
        this.elt.removeEventListener('click', (e) => {
            this.posX = container.offsetTop;
            this.updatePos();
            this.elt.classList.remove("active");
        });
    }
};

class Tower {
    constructor(label, discNumber) {
        this.tab = [];
        this.discNumber = discNumber;
        this.label = label;
        this.elt = document.createElement('div');
        this.elt.classList.add("tower")
        this.high = document.createElement('div');
        this.high.classList.add("high");
        this.base = document.createElement("div");
        this.base.classList.add("base");
        for (let i = 0; i < this.discNumber; i++) {
            let disc = new Disc(this.discNumber - i, this.label, i);
            this.tab.push(disc);
        }
        this.posX = 0;
        this.posY = 0;
    }
    get getTab() {
        return this.tab;
    }
    get getHigh(){
        return this.high;
    }
    get getBase(){
        return this.base;
    }

    set setTab(tab) {
        this.tab = tab;
    }

    put() {
        // add base and high to elt
        this.elt.appendChild(this.high);
        this.elt.appendChild(this.base);
        // place tower inside the container
        container.appendChild(this.elt);
    }
    putDisc() {
        let rect = this.base.getBoundingClientRect();
        for (let i = 0; i < this.discNumber; i++) {
            let width = parseInt(this.tab[i].getElt.style.width.split('px')[0]);
            this.tab[i].setPosX = rect.top - (i) * 28 - 28;
            this.tab[i].setPosY = rect.left + Math.floor((rect.width - width) / 2);
            this.tab[i].put();
        }
        this.activateFirstElt();
    }
    activateFirstElt() {
        if (this.tab.length > 0)
            this.tab[this.tab.length - 1].activate();
    }
};

class Grid {
    constructor(towerNumber, discNumber) {
        this.discNumber = discNumber;
        this.tower_number = towerNumber;
        this.towers = [];
    }

    get getTowers() {
        return this.towers;
    }
    createTowers() {
        let towerBegin = new Tower(0, this.discNumber);
        this.towers.push(towerBegin);
        for (let i = 1; i < this.tower_number; i++) {
            let tower = new Tower(i, 0);
            this.towers.push(tower);
        }
    }
    place() {
        // put all tower inside document
        for (let i = 0; i < this.tower_number; i++) {
            this.towers[i].put();
            this.towers[i].putDisc();
        }
    }
};

let grid = new Grid(3, 7);
grid.createTowers();
grid.place();

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        // Find the active disc
        let towers = grid.getTowers;
        for (let i = 0; i < towers.length; i++) {
            let tab = towers[i].getTab;
            if (tab.length > 0) {
                if(tab[tab.length-1].getElt.classList.contains("active") & towers[i+1] != undefined){
                    let rect = towers[i+1].getBase.getBoundingClientRect();
                    let width = tab[tab.length-1].getElt.getBoundingClientRect().width;
                    console.log(width);
                    tab[tab.length-1].posY = rect.left + Math.floor((rect.width - width) / 2);
                    tab[tab.length-1].updatePos();
                }
            }
        }
    }
});
