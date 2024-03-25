const data = []

function getSelected() {
    const { select, range } = grid.selection
    if (select.row) {
        const record = grid.records[select.row - 1]
        alert(record.personid + ":" + record.email)
    }
}

function Del() {
    const { select, range } = grid.selection
    if (select.row) {
        const record = grid.records[select.row - 1]
        alert("Delete Sucesses :")
    }
}



function Add() {
    //รับค่าจาก input
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

    // เช็กค่าในช่อง input
    if (fname && lname && email) {
        // สร้างค่า id โดยให้ +1 ไปเรื่อยๆ
        const personid = data.length + 1;

        // Add the new person to the data array
        data.push({ check: false, personid: personid, fname: fname, lname: lname, email: email });

        alert("Person added successfully!");
        grid.records = data;

    } else {
        alert("Please fill in all fields.");
    }
}


grid = new cheetahGrid.ListGrid({
    parentElement: document.querySelector(".grid-sample"),
    header: [
        { field: "check", caption: "", width: 50, columnType: "check", action: "check" },
        { field: "personid", caption: "ID", width: 100 },
        { field: "fname", caption: "First Name", width: 200 },
        { field: "lname", caption: "Last Name", width: 200 },
        { field: "email", caption: "Email", width: 250 },
    ],
    records: data
})

// grid = new cheetahGrid.ListGrid({
//     parentElement: document.querySelector(".grid-sample"),
//     header: [
//         { field: "check", caption: "", width: 50, columnType: "check", action: "check" },
//         { field: "personid", caption: "ID", width: 100 },
//         { field: "fname", caption: "First Name", width: 200 },
//         { field: "lname", caption: "Last Name", width: 200 },
//         { field: "email", caption: "Email", width: 250 },
//     ],
//     records: data
// })

const CLICK = cheetahGrid.ListGrid.EVENT_TYPE.CLICK_CELL
grid.listen(CLICK, (args) => {
    console.log(args)
})