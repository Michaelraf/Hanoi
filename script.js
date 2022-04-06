container = document.querySelector(".container");

class Disc {
    constructor(tower, index, len, posX, posY) {
        this.tower = tower;
        this.index = index;
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
        this.activated = false;
    }
    get getElt() {
        return this.elt;
    }
    get getTowerLabel() {
        return this.tower;
    }
    get getIndex() {
        return this.index;
    }
    get getLen() {
        return this.len;
    }
    set setTower(tower) {
        this.tower = tower;
    }
    set setIndex(index) {
        this.index = index;
    }
    set setPosX(posX) {
        this.posX = posX;
    }
    set setPosY(posY) {
        this.posY = posY;
    }
    setPosition() { // Setting the disc's position
        let width = this.elt.style.width.split('px')[0];
        this.elt.style.top = this.posX + "px";
        this.elt.style.left = this.posY + "px";
    }
    putToTower() { // Append the tower to the document
        container.appendChild(this.elt);
    }
    updatePos() { // Update the top and the left of the element of the disc
        this.elt.style.top = this.posX + "px";
        this.elt.style.left = this.posY + "px";
    }
    addActiveClass() { // Add "active" to the disc's class
        this.elt.classList.add("active");
    }
    removeActiveClass() { // Remove "active" to the disc's class
        if (this.elt.classList.contains("active"))
            this.elt.classList.remove("active");
    }
    handleClick() {
        this.posX = container.offsetTop;
        this.updatePos();
        this.addActiveClass();
    }
    activate() { // Make the disc able to listen to click and directly add "active" to its' element class
        if (!this.activated) {
            this.elt.addEventListener('click', this.handleClick.bind(this));
            this.activated = true;
        }
    }
    deactivate() { // 
        if (this.activated) {
            this.elt.removeEventListener('click', this.handleClick.bind(this));
            this.activated = false;
            console.log("deactivated : ");
            console.log(this);
        }
        this.removeActiveClass();
    }
};

class Tower {
    constructor(label, discNumber) {
        this.tab = [];
        this.active = false;
        this.discNumber = discNumber;
        this.label = label;
        this.elt = document.createElement('div');
        this.elt.classList.add("tower")
        this.high = document.createElement('div');
        this.high.classList.add("high");
        this.base = document.createElement("div");
        this.base.classList.add("base");
        for (let i = 0; i < this.discNumber; i++) {
            let disc = new Disc(this.label, i, this.discNumber - i, this.label, i);
            this.tab.push(disc);
        }
        this.posX = 0;
        this.posY = 0;
    }
    get getLabel() {
        return this.label;
    }
    get getTab() {
        return this.tab;
    }
    get getHigh() {
        return this.high;
    }
    get getBase() {
        return this.base;
    }
    get getDiscNumber() {
        return this.discNumber;
    }
    get getElt() {
        return this.elt;
    }
    set setDiscNumber(number) {
        this.discNumber = number;
    }
    set setActive(value) {
        this.active = value;
    }
    set setTab(tab) {
        this.tab = tab;
    }

    put() { // Put the tower inside the document
        // add base and high to elt
        this.elt.appendChild(this.high);
        this.elt.appendChild(this.base);
        // place tower inside the container
        container.appendChild(this.elt);
    }
    setDiscPosition() { // Set the tower's discs position 
        let rect = this.base.getBoundingClientRect();
        for (let i = 0; i < this.discNumber; i++) {
            let width = parseInt(this.tab[i].getElt.style.width.split('px')[0]);
            this.tab[i].setPosX = rect.top - (i) * 28 - 28;
            this.tab[i].setPosY = rect.left + Math.floor((rect.width - width) / 2);
            this.tab[i].setPosition();
        }
    }
    putDiscsToTower() { // Put discs to its' tower
        for (let i = 0; i < this.discNumber; i++) {
            this.tab[i].putToTower();
        }
    }
    activateFirstElt() { // Activate the first disc of the tower
        if (this.tab.length > 0) {
            this.tab[this.tab.length - 1].activate();
            console.log("activating first elt : ");
            console.log(this.tab[this.tab.length - 1]);
        }
    }
    activateAllElt() { // Activate all the discs of the tower
        if (this.tab.length > 0) {
            for (let i = 0; i < this.discNumber; i++) {
                this.tab[i].activate();
            }
        }
    }
    deactivateAllElt() { // Deactivate all the discs of the tower
        if (this.tab.length > 0) {
            for (let i = 0; i < this.discNumber; i++) {
                this.tab[i].deactivate();
            }
        }
    }
};

class Grid {
    constructor(towerNumber, discNumber) {
        this.discNumber = discNumber;
        this.towerNumber = towerNumber;
        this.towers = [];
    }

    get getTowers() {
        return this.towers;
    }
    createTowers() { // Create the tower of the grid
        let towerBegin = new Tower(0, this.discNumber);
        this.towers.push(towerBegin);
        for (let i = 1; i < this.towerNumber; i++) {
            let tower = new Tower(i, 0);
            this.towers.push(tower);
        }
        this.towers[0].setActive = true;
        this.towers[0].activateFirstElt();
    }
    place() { // put all tower inside document

        for (let i = 0; i < this.towerNumber; i++) {
            this.towers[i].put();
            this.towers[i].setDiscPosition();
            this.towers[i].putDiscsToTower();
        }
    }
    activateClickedTower() { // Make the clicked tower active
        for (let i = 0; i < this.towerNumber; i++) { // iterating through all towers 
            this.towers[i].getElt.addEventListener('click', (e) => {
                // deactivate all other towers
                for (let j = 0; j < this.towerNumber; j++) {
                    this.towers[j].setActive = false;
                }
                // activate the clicked tower
                this.towers[i].setActive = true;
            })
        }
    }
};

let grid = new Grid(3, 7);
grid.createTowers();
grid.place();
/* grid.activateClickedTower(); */

window.addEventListener('click', (e) => {
    if (e.target.classList.contains("disc")) {
        // get the actual position of the mouse
        let left = e.clientX;
        let top = e.clientY;
        // find the tower where the click was done
        ext:
        for (let i = 0; i < grid.towerNumber; i++) {
            let tower = grid.getTowers[i]; // for readability
            // deactivate the actual tower
            tower.setActive = false;
            let towerElt = tower.getElt;
            let rect = towerElt.getBoundingClientRect();
            if ((rect.top < top & top < rect.top + rect.height)
                & (rect.left < left & left < rect.left + rect.width)) {
                tower.setActive = true;
                break ext;
            }

        }
    }
})

window.addEventListener("keydown", (e) => { // Listening to the keydown event
    if (e.key == "ArrowRight") {
        // Find the active tower
        let activeTower = [];
        let towers = grid.getTowers;
        ext:
        for (let i = 0; i < towers.length; i++) {
            if (towers[i].active == true) { // if we find the active tower
                if (towers[i + 1] != undefined) { // and there is still a tower at it's right
                    towers[i].setActive = false;
                    towers[i + 1].setActive = true;
                    activeTower = towers[i + 1];
                    break ext;
                }
                else {
                    activeTower = towers[i];
                }
            }
        }

        // Place the active disc at the top of the active tower
        /// Find the active disc
        ext1:
        for (let i = 0; i < towers.length; i++) {
            let tab = towers[i].getTab;
            for (let j = 0; j < tab.length; j++) {
                if (tab[j].getElt.classList.contains("active")) {
                    let rect = activeTower.getBase.getBoundingClientRect();
                    let width = parseInt(tab[j].getElt.style.width.split('px')[0]);
                    tab[j].setPosY = rect.left + Math.floor((rect.width - width) / 2);
                    tab[j].updatePos();
                    break ext1;
                }
            }
        }
    }
    else if (e.key == "ArrowLeft") {
        // Find the active tower
        let towers = grid.getTowers;
        let activeTower = [];
        ext:
        for (let i = 0; i < towers.length; i++) {
            if (towers[i].active == true) { // if we find the active tower
                if (towers[i - 1] != undefined) { // and there is still a tower at it's left
                    towers[i].setActive = false;
                    towers[i - 1].setActive = true;
                    activeTower = towers[i - 1];
                    break ext;
                }
                else {
                    activeTower = towers[i];
                }
            }
        }
        /// Find the active disc
        ext1:
        for (let i = 0; i < towers.length; i++) {
            let tab = towers[i].getTab;
            for (let j = 0; j < tab.length; j++) {
                if (tab[j].getElt.classList.contains("active")) {
                    let rect = activeTower.getBase.getBoundingClientRect();
                    let width = parseInt(tab[j].getElt.style.width.split('px')[0]);
                    tab[j].setPosY = rect.left + Math.floor((rect.width - width) / 2);
                    tab[j].updatePos();
                    break ext1;
                }
            }
        }
    }
    else if (e.key == "ArrowDown") {
        // Find the active tower
        let towers = grid.getTowers;
        let activeTower = [];
        ext:
        for (let i = 0; i < towers.length; i++) {
            if (towers[i].active == true) { // if we find the active tower
                activeTower = towers[i];
                break ext;
            }
        }
        /// Find the active disc that has the "active" class and put it on the active tower
        ext1:
        for (let i = 0; i < towers.length; i++) {
            let tab = towers[i].getTab;
            for (let j = 0; j < tab.length; j++) {
                if (tab[j].getElt.classList.contains("active")) {
                    index = tab[j].getIndex;
                    label = tab[j].getTowerLabel;
                    // update its index and label
                    tab[j].setTower = activeTower.getLabel;
                    tab[j].setIndex = activeTower.getTab.length;
                    // remove the "active" class to the active disc
                    tab[j].removeActiveClass();
                    // check if there is is already an bigger disc in the active tower
                    /*                     if (activeTower.getTab.length > 0) { // if there is already an element
                                            if (activeTower.getTab[activeTower.getTab.length - 1].getLen < tab[j].getLen) {
                                                tab[j].addActiveClass();
                                                break ext1;
                                            } */
                    // else {
                    // put it inside the active tower
                    activeTower.getTab.push(tab[j]);
                    // remove the disc from its last tower
                    towers[label].getTab.splice(index, 1);
                    towers[label].discNumber -= 1;
                    // deactivate the activeTower
                    activeTower.setActive = false;
                    // update the discNumber of the active tower
                    activeTower.setDiscNumber = activeTower.getTab.length;
                    // update position
                    activeTower.setDiscPosition();
                    //deactivate all the element in all towers (for security)
                    // and activate only the first element
                    console.log("new step");
                    for (let p = 0; p < grid.towerNumber; p++) {
                        grid.getTowers[p].deactivateAllElt();
                        grid.getTowers[p].activateFirstElt();
                    }
                    break ext1;
                }
                // }
                /*                     else {
                                        // put it inside the active tower
                                        activeTower.getTab.push(tab[j]);
                                        // remove the disc from its last tower
                                        towers[label].getTab.splice(index, 1);
                                        towers[label].discNumber -= 1;
                                        // deactivate the activeTower
                                        activeTower.setActive = false;
                                        // update the discNumber of the active tower
                                        activeTower.setDiscNumber = activeTower.getTab.length;
                                        // update position
                                        activeTower.setDiscPosition();
                                        //deactivate all the element in all towers (for security)
                                        // and activate only the first element
                                        for (let p = 0; p < grid.towerNumber; p++) {
                                            grid.getTowers[p].deactivateAllElt();
                                            grid.getTowers[p].activateFirstElt();
                                        }
                                        break ext1;
                                    } */
                // }
            }
        }
    }
});
