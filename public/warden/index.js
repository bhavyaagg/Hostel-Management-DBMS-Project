/**
 * Created by bhavyaagg on 25/04/18.
 */
$(document).ready(() => {
    $('#addInventory').click(() => {
        $('#noticeBoard').empty().css('display', 'block').append(`
          <div class="form-group">
            <input id="itemName" required type="text" class="form-control input"
                             placeholder="Item Name">
          </div>
          <div class="form-group">
            <input id="qty" required type="number" class="form-control input"
                             placeholder="Quantity">
          </div>
          <div id="errorAddInventory" class="text-danger text-capitalize">
            
          </div>
          <button id="submitInventoryBtn" class="btn btn-success">Submit</button>
        `);

        $('#submitInventoryBtn').click(() => {
            let hid = +localStorage.getItem('hid')
            let name = $('#itemName').val();
            let qty = $('#qty').val()

            console.log(hid)
            console.log(name)
            console.log(qty)



            if (!qty || qty <= 0) {
                $('#errorAddInventory').text("Please Enter Valid Quantity(Quantity>0)");
                return;
            }



            $.post("/api/inventory/add", {
                name,
                hid,
                qty
            }).done(function (hostel) {
                if (hostel.success) {
                    $('#errorAddInventory').removeClass('text-danger').addClass('text-success').text("Inventory Added");
                } else {
                    console.log(2)
                    console.log(hostel.error);
                    $('#errorAddInventory').addClass("text-danger").removeClass('text-success').text("Some Error Add Inventory")
                }
            }).fail(function (hostel) {
                console.log(hostel.responseJSON)
                if (hostel.responseJSON.error.name === 'SequelizeUniqueConstraintError') {
                    $('#errorAddInventory').text(`${hostel.responseJSON.error.errors[0].type}! ${hostel.responseJSON.error.errors[0].message}`)
                } else {
                    $('#errorAddInventory').addClass("text-danger").removeClass('text-success').text("Some Error Add Hostel2")
                }
            });
        })
    })

    $('#viewInventory').click(() => {
        $.get('/api/inventory/viewAll')
            .done((data) => {
                if (data.success) {
                    let inventory = data.data;
                    console.log(inventory)
                    $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col">
                  <ul id="viewAllHostels" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <b>EMID</b>
                      </div>
                      <div class="col">
                      <b>HOSTEL NAME</b>
                      </div> 
                      
                      <div class="col">
                      <b>ITEM NAME</b>
                      </div> 
                      <div class="col">
                      <b>QUANTITY</b>
                      </div> 
                      
                      
                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)
                    inventory.forEach((inventory) => {
                        $('#noticeBoard').append(`
              <li class="list-group-item">
              <div class="row">
                      <div class="col">
                        ${inventory.emid}
                      </div>
                      <div class="col">
                        ${inventory.hname}
                      </div>
                      
                      <div class="col">
                        ${inventory.name}
                      </div> 
                      <div class="col">
                        ${inventory.qty}
                      </div> 
                    </div>
              </li>
                        
                      `)
                    })
                } else {
                    console.log("Some error view inventory")
                }
            })
            .fail((err) => {
                console.log(2)
                console.log(err)
            })
    })
    $('#addFine').click(() => {
        $('#noticeBoard').empty().css('display', 'block').append(`
          <div class="form-group">
            <input id="rno" required type="text" class="form-control input"
                             placeholder="Roll Number">
          </div>
          <div class="form-group">
            <input id="remark" required type="number" class="form-control input"
                             placeholder="Remark">
          </div>
          <div class="form-group">
            <input id="amt" required type="number" class="form-control input"
                             placeholder="Amount">
          </div>
          <div class="form-group">
            Is Paid: <input id="paid" required type="checkbox" class="form-control input"
                             placeholder="Quantity">
          </div>
          <div id="errorAddFine" class="text-danger text-capitalize">
            
          </div>
          <button id="submitInventoryBtn" class="btn btn-success">Submit</button>
        `);

        $('#submitInventoryBtn').click(() => {
            let hid = +localStorage.getItem('hid')
            let name = $('#itemName').val();
            let qty = $('#qty').val()

            console.log(hid)
            console.log(name)
            console.log(qty)



            if (!qty || qty <= 0) {
                $('#errorAddFine').text("Please Enter Valid Quantity(Quantity>0)");
                return;
            }



            $.post("/api/inventory/add", {
                name,
                hid,
                qty
            }).done(function (hostel) {
                if (hostel.success) {
                    $('#errorAddFine').removeClass('text-danger').addClass('text-success').text("Inventory Added");
                } else {
                    console.log(2)
                    console.log(hostel.error);
                    $('#errorAddFine').addClass("text-danger").removeClass('text-success').text("Some Error Add Inventory")
                }
            }).fail(function (hostel) {
                console.log(hostel.responseJSON)
                if (hostel.responseJSON.error.name === 'SequelizeUniqueConstraintError') {
                    $('#errorAddFine').text(`${hostel.responseJSON.error.errors[0].type}! ${hostel.responseJSON.error.errors[0].message}`)
                } else {
                    $('#errorAddFine').addClass("text-danger").removeClass('text-success').text("Some Error Add Hostel2")
                }
            });
        })
    })

    $('#viewInventory').click(() => {
        $.get('/api/inventory/viewAll')
            .done((data) => {
                if (data.success) {
                    let inventory = data.data;
                    console.log(inventory)
                    $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col">
                  <ul id="viewAllHostels" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <b>EMID</b>
                      </div>
                      <div class="col">
                      <b>HOSTEL NAME</b>
                      </div> 
                      
                      <div class="col">
                      <b>ITEM NAME</b>
                      </div> 
                      <div class="col">
                      <b>QUANTITY</b>
                      </div> 
                      
                      
                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)
                    inventory.forEach((inventory) => {
                        $('#noticeBoard').append(`
              <li class="list-group-item">
              <div class="row">
                      <div class="col">
                        ${inventory.emid}
                      </div>
                      <div class="col">
                        ${inventory.hname}
                      </div>
                      
                      <div class="col">
                        ${inventory.name}
                      </div> 
                      <div class="col">
                        ${inventory.qty}
                      </div> 
                    </div>
              </li>
                        
                      `)
                    })
                } else {
                    console.log("Some error view inventory")
                }
            })
            .fail((err) => {
                console.log(2)
                console.log(err)
            })
    })
})

