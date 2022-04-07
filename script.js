const container = document.querySelector(".container");
let clicked = false; 
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
        this.isFirst = false;
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
    set setElement(elt) {
        this.elt = elt;
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
    addFirstClass() {// Add "active" to the disc's class
        this.elt.classList.add("first");
    }
    removeActiveClass() { // Remove "active" to the disc's class
        if (this.elt.classList.contains("active"))
            this.elt.classList.remove("active");
    }
    removeFirstClass() { // Remove "active" to the disc's class
        if (this.elt.classList.contains("first"))
            this.elt.classList.remove("first");
    }
    handleClick() {
        if (this.isFirst /* & !clicked */){
            this.posX = container.offsetTop;
            this.updatePos();
            this.addActiveClass();
            this.addFirstClass();
            // clicked = true;
        }
    }
    activate() { // Make the disc able to listen to click and directly add "active" to its element class
        this.elt.addEventListener('click', this.handleClick.bind(this));
        // if(!clicked)
            this.activated = true;
    }
    deactivate() { // 
        this.isFirst = false;
        this.activated = false;
        this.removeActiveClass();
        this.removeFirstClass();
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
        this.activateAllElt();
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
            this.tab[this.tab.length - 1].isFirst = true;
            this.tab[this.tab.length - 1].activate();
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
    getDiscWithActiveClass() { // return the active disc with it's index inside an object
        for (let i = 0; i < this.tab.length; i++) {
            if (this.tab[i].getElt.classList.contains("active")) {
                return { "activeDisc": this.tab[i], "index": i }
            }
        }
        return { "activeDisc": "none", "index": -1 };
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
    activateOnlyFirst() {
        for (let i = 0; i < grid.towerNumber; i++) {
            for (let j = 0; j < this.towers[i].tab.length; j++) {
                this.towers[i].tab[j].removeActiveClass();
                this.towers[i].tab[j].isFirst = false;
            }
            this.towers[i].activateAllElt();
            this.towers[i].activateFirstElt();
        }
    }
    getActiveTower() { // returns the active tower and it's index in the grid in an object
        for (let i = 0; i < this.towers.length; i++) {
            if (this.towers[i].active == true) { // if we find the active tower
                return { "activeTower": this.towers[i], "index": i };
            }
        }
        return {"activeTower": "none", "index": -1}
    }
    handleDiscExchange(activeTower, activeDisc) {
        let label = activeDisc.getTowerLabel;
        // update its index and label
        activeDisc.setTower = activeTower.getLabel;
        activeDisc.setIndex = activeTower.getTab.length;
        // put it inside the active tower
        activeTower.getTab.push(activeDisc);
        // update the discNumber of the active tower
        activeTower.discNumber += 1;
        // remove the disc from its last tower
        this.towers[label].getTab.pop();
        this.towers[label].discNumber -= 1;
        // deactivate all the element in this.towers (for security)
        // and activate only the first element
        this.activateOnlyFirst();
        // update position
        activeTower.setDiscPosition();
        // release the click
        // clicked = false;
    }
    getActiveDisc(){
        for (let i=0; i<this.towers.length; i++){
            let {activeDisc, index} = this.towers[p].getActiveDisc();
            if(activeDisc != "none"){
                return activeDisc;
            }
        }
        return "none";
    }
};

let grid = new Grid(3, 7);
grid.createTowers();
grid.place();
window.addEventListener('click', (e) => {
    let getActiveTower = grid.getActiveTower();
    let lastActiveTower = getActiveTower.activeTower;
    if (e.target.classList.contains("disc")) {
        // get the actual position of the mouse
        let left = e.clientX;
        let top = e.clientY;
        // find the tower where the click was done
        ext:
        for (let i = 0; i < grid.towerNumber; i++) {
            let tower = grid.getTowers[i]; // for readability
            let towerElt = tower.getElt;
            let rect = towerElt.getBoundingClientRect();
            if ((rect.top < top & top < rect.top + rect.height)
                & (rect.left < left & left < rect.left + rect.width)) {
                lastActiveTower.setActive = false; // first, deactivate the last active tower
                tower.setActive = true; // then, activate the new one
                break ext;
/*                 if(clicked){
                    lastActiveTower.setActive = false; // first, deactivate the last active tower
                    tower.setActive = true; // then, activate the new one
                    break ext;
                }
                else{
                    lastActiveTower.setActive = true;
                 }*/
            }

        }
    }
});

window.addEventListener("keydown", (e) => { // Listening to the keydown event

    if (e.key == "ArrowRight") {
        // Find the active tower
        let { activeTower, index } = grid.getActiveTower();
        console.log("active tower : ");
        console.log(activeTower);
        let towers = grid.getTowers;
        if (towers[index+1] != undefined) {
            activeTower.setActive = false;
            towers[index+1].setActive = true;
            activeTower = towers[index+1]
        }
        // Place the active disc at the top of the active tower
        /// Find the active disc
        ext1:
        for (let i = 0; i < towers.length; i++) {
            let { activeDisc, index } = towers[i].getDiscWithActiveClass();
            if (activeDisc != "none") {
                let rect = activeTower.getBase.getBoundingClientRect();
                let width = parseInt(activeDisc.getElt.style.width.split('px')[0]);
                activeDisc.setPosY = rect.left + Math.floor((rect.width - width) / 2);
                activeDisc.updatePos();
                break ext1;
            }
        }
    }
    else if (e.key == "ArrowLeft") {
        // Find the active tower
        let { activeTower, index } = grid.getActiveTower();
        let towers = grid.getTowers;
        if (towers[index - 1] != undefined) {
            activeTower.setActive = false;
            towers[index-1].setActive = true;
            activeTower = towers[index-1];
        }
        /// Find the active disc
        ext1:
        for (let i = 0; i < towers.length; i++) {
            let { activeDisc, index } = towers[i].getDiscWithActiveClass();
            if (activeDisc != "none") {
                let rect = activeTower.getBase.getBoundingClientRect();
                let width = parseInt(activeDisc.getElt.style.width.split('px')[0]);
                activeDisc.setPosY = rect.left + Math.floor((rect.width - width) / 2);
                activeDisc.updatePos();
                break ext1;
            }
        }
    }
    else if (e.key == "ArrowDown") {
        // Find the active tower
        let towers = grid.getTowers;
        let { activeTower, towerIndex } = grid.getActiveTower();
        if (activeTower) {
            ext1:
            /// Find the active disc that has the "active" class and put it on the active tower
            for (let i = 0; i < towers.length; i++) {
                ({ activeDisc, discIndex } = towers[i].getDiscWithActiveClass());
                if (activeDisc != "none") {
                    label = activeDisc.getTowerLabel;
                    // check if active tower is the actual tower of the disc
                    if (activeTower == towers[label]) {
                        // update position
                        activeTower.setDiscPosition()
                        break ext1;
                    }
                    // check if there is already a smaller disc 
                    let lenActive = activeTower.getTab.length;
                    let lenCurrent = activeDisc.getLen;
                    if (lenActive > 0) {
                        if (activeTower.getTab[lenActive - 1].getLen >= lenCurrent) {
                            grid.handleDiscExchange(activeTower, activeDisc);
                            break ext1;
                        }
                    }
                    else {
                        grid.handleDiscExchange(activeTower, activeDisc);
                        break ext1;
                    }
                }
            }
        }
    }
});