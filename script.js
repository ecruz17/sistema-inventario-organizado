class Product {
    constructor(code, name, quantity, cost) {
        this.code = code;
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
    }

    getProductValue() {
        return this.quantity*this.cost;
    }

    getCode() {
        return this.code;
    }

    getProductName() {
        return this.name;
    }

    getQuantity() {
        return this.quantity;
    }

    getCost() {
        return this.cost;
    }

    getProductDetails() {
        return `Código: ${this.code}, Producto: ${this.name}, Cantidad: ${this.quantity}, Costo por unidad: ${this.cost}, Costo Total: ${this.getProductValue()}`;
    }

}

class Inventory {
    constructor() {
        this.registry = new Array();
    }

    add(product) {
        this.registry.push(product);
    }

    getArray() {
        return this.registry;
    }

    delete(code) {
        let pos = this._findByCode(code);
        let nextPos = pos+1;
        if(pos != null) {
            while(nextPos < this.registry.length) {
                let move = this.registry[pos]
                this.registry[pos] = this.registry[nextPos];
                this.registry[nextPos] = move;
                pos++;
                nextPos++;
            }
            return this.registry.pop();
        }
        return null;
    }

    search(code) {
        for(let i = 0; i < this.registry.length; i++) {
            if(code === this.registry[i].getCode()) {
                return this.registry[i];
            }
        }
        return null;
    }

    listAll() {
        this.registry.forEach((el) => {
            document.getElementById('details').innerHTML += 
            `<br> ${el.getProductDetails()} </br>`;
        });
    }

    listAllInverted() {
        for(let i = this.registry.length - 1; i >= 0; i--) {
            document.getElementById('details').innerHTML += 
            `<br> ${this.registry[i].getProductDetails()} </br>`;
        }
    }

    _findByCode(code) {
        for(let i = 0; i < this.registry.length; i++) {
            if(code === this.registry[i].getCode()) {
                return i;
            }
        }
        return null;
    }

    organize() {
        let pos = this.registry.length - 1;
        for(let i = 0; i < this.registry.length; i++) {
            if(this.registry[pos].getCode() < this.registry[i].getCode()) {
                let space = this.registry[pos];
                this.registry[pos] = this.registry[i];
                this.registry[i] = space;
            }
        }
    }

}

let inventory1 = new Inventory();

function cleanHTML() {
    return `<p> </p>`;
}

let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
    let code = document.getElementById('txtCode').value;
    let name = document.getElementById('txtName').value;
    let quantity = document.getElementById('txtQuantity').value;
    let cost = document.getElementById('txtCost').value;
    if(inventory1.registry.length <= 20) {
        let product = new Product(code, name, quantity, cost);
        inventory1.add(product);
        document.getElementById('details').innerHTML =
        `<p>El producto ${product.getProductName()} se agregó correctamente</p>`
        console.log(inventory1.registry);
        inventory1.organize();
    } else {
        document.getElementById('details').innerHTML =
        `<p>El inventario está lleno</p>`
    }
});

let btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', () => {
    let code = document.getElementById('txtCodeSearch').value;
    let productSearch = inventory1.search(code);
    let detailsHTML = document.getElementById('details');
    if(productSearch === null) {
        detailsHTML.innerHTML =
        `<p>El producto no existe</p>`;
    } else {
        detailsHTML.innerHTML =
        `<div class="card"> <p>Producto encontrado</p> <p>${productSearch.getProductDetails()}</p>`, '</div>';
    }
});


let btnListAll = document.getElementById('btnListAll');
btnListAll.addEventListener('click', () => {
    let details = document.getElementById('details');
    details.innerHTML = this.cleanHTML();
    inventory1.listAll();
});

let btnListAllInverted = document.getElementById('btnListInvert');
btnListAllInverted.addEventListener('click', () => {
    let details = document.getElementById('details');
    details.innerHTML = this.cleanHTML();
    inventory1.listAllInverted();
});

let btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () => {
    let code = document.getElementById('txtCodeSearch').value;
    let productDeleted = inventory1.delete(code);
    let detailsHTML = document.getElementById('details');
    if(productDeleted === null) {
        detailsHTML.innerHTML =
        `<p>El producto no existe</p>`;
    } else {
        detailsHTML.innerHTML =
        `<div class="card"> <p>Producto ${productDeleted.getProductName()} eliminado correctamente</p>`, '</div>';
        console.log(inventory1.getArray());
    }
});