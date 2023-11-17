const menus = [
    {
        "name": "Burger",
        "img": "burger.png",
        "price": 44000,
        "type": "Makanan"
    },
    {
        "name": "Kue Coklat",
        "img": "cake.png",
        "price": 36000,
        "type": "Makanan"
    },
    {
        "name": "Kopi",
        "img": "coffee-cup.png",
        "price": 25000,
        "type": "Minuman"
    },
    {
        "name": "Kentang Goreng",
        "img": "fried-potatoes.png",
        "price": 20000,
        "type": "Makanan"
    },
    {
        "name": "Nasi Goreng",
        "img": "fried-rice.png",
        "price": 32000,
        "type": "Makanan"
    },
    {
        "name": "Ice Cream",
        "img": "ice-cream.png",
        "price": 30000,
        "type": "Minuman"
    },
    {
        "name": "Ice Tea",
        "img": "ice-tea.png",
        "price": 15000,
        "type": "Minuman"
    },
    {
        "name": "Ice Coffee",
        "img": "iced-coffee.png",
        "price": 25000,
        "type": "Minuman"
    },
    {
        "name": "Mie",
        "img": "mie.png",
        "price": 54000,
        "type": "Makanan"
    },
    {
        "name": "Steak",
        "img": "steak.png",
        "price": 83000,
        "type": "Makanan"
    },
]

let [daftarMenu, dataMenu, listMenu, listBeli, alert, elgrandtotal, grandtotal, generalState] = [
    menus,
    [],
    document.getElementById("list-menu"),
    document.getElementById("list-beli"),
    document.getElementById("alert"),
    document.getElementById("grandtotal"),
    0,
    null
]

const formatNumber = (number, rp = true) => {
    let str_number = number.toString().replace(/[^,\d]/g, "")
    if (!rp) return str_number
    let split = str_number.split(",")
    let sisa = split[0].length % 3
    let rupiah = split[0].substr(0, sisa)
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    if (ribuan) {
        separator = sisa ? "." : ""
        rupiah += separator + ribuan.join(".")
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah
    return "Rp " + rupiah
}

const uniqBarang = () => {
    return dataMenu.length > 0 ? dataMenu.map((v) => v[0]) : []
}

const inputState = (value) => {
    if (value) generalState = value
}

const calculateGrandTotal = () => {
    grandtotal = 0
    dataMenu.forEach(element => {
        grandtotal += element[2]
    })
    elgrandtotal.innerHTML = formatNumber(grandtotal, true)
}

const showBarang = () => {
    if (!listBeli) return
    listBeli.innerHTML = `<p class="other-font pt-3" id="data-kosong">-</p>`

    if (dataMenu.length > 0) listBeli.innerHTML = ""

    dataMenu.forEach((element, i) => {
        listBeli.innerHTML += `
            <div class="border-bottom pb-2">
                <table class="w-100">
                    <tr>
                        <td rowspan="3" class="text-center align-middle" style="min-width: 90px;">
                            <img draggable="false" src="./assets/images/${element[1]}" class="card-img-top order-list">
                        </td>
                        <td class="w-100">
                            <span class="type">${element[3]}</span>
                        </td>
                        <td rowspan="2" class="text-right" style="min-width: 90px;">
                            <h6 class="text-warning mb-0">${formatNumber(element[2])}</h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6 class="f-bold">${element[0]}</h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="input-group input-group-sm pill-num">
                                <div class="input-group-prepend" onclick="editMenu(${i}, 'min')">
                                    <span class="input-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                    </span>
                                </div>
                                <input type="number" class="form-num" value="${element[4]}" id="input-num-${i}" oninput="editMenu(${i})">
                                <div class="input-group-prepend" onclick="editMenu(${i}, 'plus')">
                                    <span class="input-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg></span>
                                </div>
                            </div>
                        </td>
                        <td class="text-right" onclick="deleteBarang(${i})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path fill="#ced4da" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill="#ced4da" fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </td>
                    </tr>
                </table>
            </div>
        `
    })

    calculateGrandTotal()
}

const addMenu = () => {
    if (!generalState) return;
    let menu = getMenu(generalState)
    if (!uniqBarang().includes(menu.name) && menu.name) {
        dataMenu.push([
            menu.name,
            menu.img,
            menu.price,
            menu.type,
            1,
        ])
        showBarang()
        alert.innerHTML = ""
        generalState = null
        return
    } else if (uniqBarang().includes(menu.name)) {
        alert.innerHTML = "Menu sudah ditambahkan!"
        generalState = null
        return
    }
}

const editMenu = (id, opsi = null) => {
    const inputNum = document.getElementById(`input-num-${id}`)
    const menu = getMenu(dataMenu[id][0])
    if (Number(inputNum.value) < 1) inputNum.value = 1
    if (opsi == 'plus') inputNum.value = Number(inputNum.value) + 1
    if (opsi == 'min') {
        inputNum.value = Number(inputNum.value) == 1
            ? 1
            : Number(inputNum.value) - 1
    }
    let total = menu.price * inputNum.value
    dataMenu[id] = [
        dataMenu[id][0],
        dataMenu[id][1],
        total,
        dataMenu[id][3],
        Number(inputNum.value)
    ]

    showBarang()
    alert.innerHTML = ""
}

const deleteBarang = (id) => {
    dataMenu.splice(id, 1)

    showBarang()
    alert.innerHTML = ""
}

const searchMenu = () => {
    const query = document.getElementById('search').value.toLowerCase()
    daftarMenu.forEach(element => {
        let matching = element.name.toLowerCase().match(query)
        let card = document.getElementById(`card-${element.name}`)
        if (!matching) {
            card.style.display = "none"
        } else {
            card.style.display = "flex"
        }
    })
}

const getMenu = (input) => {
    const query = input.toLowerCase()
    let result
    daftarMenu.forEach(element => {
        let matching = element.name.toLowerCase().match(query)
        if (matching) {
            if (matching.input == input.toLowerCase()) result = element
        }
    })
    return result
}

showBarang()

const generateCardMenu = () => {
    if (!listMenu) return;
    daftarMenu.forEach(element => {
        listMenu.innerHTML += `
            <div class="card order" id="card-${element.name}" onclick="inputState('${element.name}')">
                <img draggable="false" src="./assets/images/${element.img}" class="card-img-top order mx-auto p-3">
                <div class="">
                    <h6 class="f-bold mb-0">${element.name}</h6>
                    <h6 class="text-warning">${formatNumber(element.price, true)}</h6>
                </div>
            </div>
        `
    })
}

generateCardMenu()