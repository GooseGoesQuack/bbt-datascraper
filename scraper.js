function getTFL() { 
    $.ajax({
        type: 'GET',
        url:'https://api.tfl.gov.uk/Line/154/Arrivals/490012554E?modesFilter=tube&oysterOnly=false',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(key, value) {
                var requestTime = (new Date()).getTime();
                var busID = value.vehicleId;
                var eta = value.timeToStation;
                var mapsTraffic = 0;
                write(requestTime, busID, eta, mapsTraffic);
            });
        }
    });
}

function write(requestTime, busID, eta, mapsTraffic) {
    // write to google sheets database
}