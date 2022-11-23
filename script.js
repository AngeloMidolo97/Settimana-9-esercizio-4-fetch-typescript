"use strict";
class Abbigliamento {
    constructor(_id, _codprod, _collezione, _capo, _modello, _quantita, _colore, _prezzoivaesclusa, _prezzoivainclusa, _disponibile, _saldo) {
        this.id = _id,
            this.codprod = _codprod,
            this.collezione = _collezione,
            this.capo = _capo,
            this.modello = _modello,
            this.quantita = _quantita,
            this.colore = _colore,
            this.prezzoivaesclusa = _prezzoivaesclusa,
            this.prezzoivainclusa = _prezzoivainclusa,
            this.disponibile = _disponibile,
            this.saldo = _saldo;
    }
    getSaldoCapo() {
        return this.prezzoivaesclusa * this.saldo / 100;
    }
    getAcquistoCapo() {
        return this.prezzoivainclusa - this.getSaldoCapo();
    }
}
let array;
getData();
function getData() {
    fetch('http://localhost:3000/capi').then((response) => {
        return response.json();
    }).then((data) => {
        array = [];
        array = data;
        console.log(array);
        array.map(function (element) {
            let c = new Abbigliamento(element.id, element.codprod, element.collezione, element.capo, element.modello, element.quantita, element.colore, element.prezzoivaesclusa, element.prezzoivainclusa, element.disponibile, element.saldo);
            console.table(c);
            console.log('Totale: ' + c.getAcquistoCapo());
            console.log('Sconto: ' + c.getSaldoCapo());
            document.getElementById('table').innerHTML +=
                `<tr class="text-center">
            <th class="text-success">${c.id}</th>
            <td>${c.capo}</td>
            <td>${c.colore}</td>
            <td>${c.prezzoivaesclusa} &euro;</td>
            <td>${c.prezzoivainclusa} &euro;</td>
            <td>${c.saldo} %</td>
            <td>${c.getSaldoCapo()} &euro;</td>
            <td>${c.getAcquistoCapo().toFixed(2)} &euro;</td>
            </tr>`;
        });
    });
}
