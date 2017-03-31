// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require moment
//= require turbolinks
//= require_tree .
//= require bootstrap-datepicker
//= require s3_direct_upload

$(document).on('turbolinks:load', function() {
    $(".select-all-checkboxes").change(function() {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });

    $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
    $('.datepicker').change(function() {
        var date = new Date($(this).val());
        var corrected_date = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
        $("#followup_date").val(corrected_date);
    });

    $('#s3_uploader').S3Uploader({
        remove_completed_progress_bar: false,
        progress_bar_target: $('#uploads_container')
    });

    $('#s3_uploader').bind('s3_upload_complete', function(e, content) {
        $('#submit-sold').removeAttr("disabled");
    });

    $('#s3_uploader').bind('s3_upload_failed', function(e, content) {
        return alert(content.filename + ' failed to upload. Error: ' + content.error_thrown);
    });
});



function redirect(url) {
    window.location.href = url;
}

function select_seller_option(value) {
    if (value == 'none') {
        $('.seller-action-form').hide();
    } else if (value == 'followup') {
        $('.seller-action-form').hide();
        $('#followup-seller-action-form').show();
    } else if (value == 'sold') {
        $('.seller-action-form').hide();
        $('#sold-seller-action-form').show();
    } else if (value == 'canceled') {
        $('.seller-action-form').hide();
        $('#canceled-seller-action-form').show();
    }
}