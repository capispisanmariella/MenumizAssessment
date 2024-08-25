$(document).ready(function() {
    var table = $('#leaveTable').DataTable({
        columnDefs: [
            { orderable: false, targets: [ 7 ] },
            { className: 'select-checkbox', targets: 0 },
            { className: 'status-column', targets: 1 },
            { className: 'actions-column', targets: 6 },
            { className: 'more-column', targets: 7 },
            { visible: false, targets: 1 },
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        order: [[2, 'asc']],
        pageLength: 25,
        lengthChange: false,
        searching: false,
        pagingType: 'simple',
        responsive: true,
        language: {
            paginate: {
                previous: '',
                next: ''
            },
            info: ""
        },
        dom: '<"top"i>rt<"bottom"p><"clear">',
        "drawCallback": function(settings, json) {
            console.log('DataTables has finished its initialization.');
            console.log(settings.aoData.length);
            if(settings.aoData.length <= 25) {
                $('.btn-prev').prop('disabled', true);
                $('.btn-next').prop('disabled', true);
            }
        }
    });

     $('tbody .select-checkbox input[type="checkbox"]').on('click', function() {

        var checkedCount = $('tbody .select-checkbox input[type="checkbox"]:checked').length;
        var totalCheckedBox = $('tbody .select-checkbox input[type="checkbox"]').length;

        if(checkedCount < totalCheckedBox) {
            $('thead .select-checkbox input[type="checkbox"]').prop('checked', false);
        }
        else {
            $('thead .select-checkbox input[type="checkbox"]').prop('checked', true);
        }
        updateTotalSelected();
    });

    $('thead .select-checkbox input[type="checkbox"]').on('click', function() {

        var checkedCount = $('tbody .select-checkbox input[type="checkbox"]:checked').length;
        var totalCheckedBox = $('tbody .select-checkbox input[type="checkbox"]').length;

        console.log(checkedCount, totalCheckedBox);
        if(checkedCount < totalCheckedBox) {
            $('tbody .select-checkbox input[type="checkbox"]').prop('checked', true);
        }
        else {
            $('tbody .select-checkbox input[type="checkbox"]').prop('checked', false);
        }
        updateTotalSelected();
    });


    function updateTotalSelected() {
        var totalSelected = $('tbody .select-checkbox input[type="checkbox"]:checked').length;

        if (totalSelected > 0) {
            $('.total-selected').text('TOTAL: ' + totalSelected);
            $('.action-footer').show();
        }
        else {
            $('.action-footer').hide();
        }
    }

    $('.btn-prev').on('click', function() {
        table.page('previous').draw('page');
    });

    $('.btn-next').on('click', function() {
        table.page('next').draw('page');
    });

    function updatePaginationInfo() {
        var info = table.page.info();
        $('.table-footer span').text((info.start + 1) + '-' + info.end + ' OF ' + info.recordsTotal);
    }

    table.on('draw', updatePaginationInfo);
    updatePaginationInfo();

    $('.view-toggle button').on('click', function() {
        $('.view-toggle button').removeClass('active');
        $(this).addClass('active');
    });

    $('.status-filter button').on('click', function() {
        $('.status-filter button').removeClass('active');
        $(this).addClass('active');
    });

    $('.prev-month, .next-month').on('click', function() {
    });

    var modal = document.getElementById("approvalModal");
    var span = document.getElementsByClassName("close")[0];

    function openModal(name, leaveType, duration) {
        $('#employeeName').text(name);
        $('#leaveType').text(leaveType.toLowerCase());
        $('#leaveDuration').text(duration % 1 === 0 ? parseInt(duration) : duration);
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $('.btn-approve').on('click', function() {
        var row = $(this).closest('tr');
        var name = row.find('td:nth-child(2)').text().trim();
        var leaveType = row.find('td:nth-child(5)').text().trim();
        var duration = row.find('td:nth-child(4)').text().trim();
        openModal(name, leaveType, duration);
        $(".single").show();
        $(".multiple").hide();
    });

    $('.btn-approve-all').on('click', function() {
        openModal("","","");
        $(".single").hide();
        $(".multiple").show();
    });

    $('#modalNo').on('click', function() {
        modal.style.display = "none";
    });

    $('#modalYes').on('click', function() {
        console.log("Approved!");
        modal.style.display = "none";
    });

    $('.progress-circle').each(function() {
        var progress = $(this).data('progress');
        $(this).css('--progress', progress * 3.6 + 'deg');
    });

    $('#sickdaySelect, #monthSelect, #mostDaysAwaySelect').each(function() {
        $(this).SumoSelect();
    });

    $('.weekday').click(function() {
        $('.weekday').removeClass('active');
        $(this).addClass('active');
    });

    $('.menu-toggle').on('click', function() {
        $('.sidebar').toggleClass('active');
        $('.main-content').toggleClass('sidebar-active');
    });

});

