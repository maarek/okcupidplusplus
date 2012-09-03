this.getFullImage = function(url){
    var img = url.split('/');
    img = img[img.length - 1];
    var fullimg = url.split('/images/')[0]+'/images/'+img;
    return fullimg;
};

this.largeImage = function(){
    xOffset = 10;
    yOffset = 30;

    $("img").hover(function(e){
        if ($("#full_albums").length) return;
        if ($(this).closest(".thumbnails").length) return;
        if ($(this).closest("#profile_thumbs").length) return;
        this.t = this.title;
        this.title = "";
        var c = (this.t != "") ? "<br/>" + this.t : "";
        $("body").append("<div id='preview'><img src='"+ getFullImage(e.target.src) +"' alt ='Username' /><p></p>"+ c + "</div>");
        $("#preview")
            .css({
                'position': 'absolute', 
                'border': '1px solid #ccc', 
                'background': '#333', 
                'padding': '5px',
                'padding-bottom': '20px', 
                'display': 'none', 
                'color': '#fff',
                'z-index': 100000,
                'max-width': '500px',
                'max-height': '400px'})
            .css("top",(e.pageY - xOffset)+"px")
            .css("left",(e.pageX - yOffset)+"px")
            .fadeIn("fast");
        $("#preview img")
            .css({
                'max-width': '500px',
                'max-height': '400px'});
        //var username = $(this).parents(".card").$(".user_info .username").text();
        //var vitals = e.parents(".card").$(".user_info .vitals").text();
        var username = $(this).closest("div").find("div").find(".username").text();
        if (username == "") // Visitors
            username = $(this).closest("li").find(".username").text();
        if (username == "") // You might like
            username = $(this).closest("li").find("h6").text();
        if (username == "") // Match
            username = $(this).closest("div").find("h4").text();

        var vitals = $(this).closest("div").find("div").find(".vitals").text();
        if (vitals == "") // Visitors
            vitals = $(this).closest("li").find(".demographics").text();
        if (vitals == "") // You might like
            vitals = $(this).closest("li").find("p").text();
        //if (vitals == "")
        //    vitals = $(this).closest("div").find(".aso").text() + " " + $(this).closest("div").find(".location").text();
        
        var location = $(this).closest("div").find("div").find(".location").text();

        $("#preview p").text(username+" "+vitals+" "+location).css("position","relative").css("left",1+"px").css("bottom",1+"px");

    },
    function(){
        this.title = this.t;
        $("#preview").remove();
    });
    $("img").mousemove(function(e){
        $("#preview")
            .css("top",(e.pageY - xOffset)+"px")
            .css("left",(e.pageX + yOffset)+"px");
    });
};

this.distanceMod = function(){

    $("#radius").after('<input type="text" name="radiusText" id="radiusText" />').hide();
    
    var radius = (localStorage.getItem('radius') == undefined)?localStorage.getItem('radius'):$('#radius option:selected').val();

    $("#radiusText")
		.val(radius)
		.css('width','5em')
		.keyup(function(){
            updateDistance($("#radiusText").val());
        });
	

	updateDistance(radius);


	$("#radiusText").after(' miles');
};

this.updateDistance = function(dist){
	dist = parseInt(dist, 10);
	if (dist < 1)
		dist = 1;
	localStorage.setItem('radius', dist);
    $('#radius option:selected').val(dist);
	$("#location_interface_button_text").text('Within '+$("#radius option:selected").val()+' mile'+($("#radius option:selected").val()==1?'':'s')+' of me');
};


$(document).ready(function(){
	largeImage();
	distanceMod();

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() * .70) {
            largeImage();
        }
    });
    //$(document).bind('DOMSubtreeModified', largeImage());

});


